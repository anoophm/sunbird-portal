const http = require('http');
const https = require('https');
const httpAgent = new http.Agent({
    keepAlive: true, // maxSockets: 1000, // allow 100 at a time
});
const httpsAgent = new https.Agent({
    keepAlive: true, // maxSockets: 1000, // allow 100 at a time
});
const httpProxy = require('http-proxy');
const _ = require('lodash');
const envHelper = require('../helpers/environmentVariablesHelper.js')
const sunbirdApiAuthToken = envHelper.PORTAL_API_AUTH_TOKEN


module.exports = function (target) {
    const proxyServerOption = {
        secure: false, // to enable http -> https, for secure connection we need to add ssl certs to server options
        target: target, // set target
        agent: target.startsWith('https') ? httpsAgent : httpAgent, // add custom agent with keep alive
        headers: {
            'Authorization': 'Bearer ' + sunbirdApiAuthToken
        }, // add additional headers
        selfHandleResponse: true, // enables override response from proxy server
    }
    console.log(proxyServerOption);
    const proxyServer = httpProxy.createProxyServer(proxyServerOption);
    proxyServer.on('error', function (error, req, res, target) {
        res.status(500);
        res.send({
            code: error.code,
            message: error.reason
        });
    });
    proxyServer.on('proxyReq', function (proxyReq, req, res, options) {
        if (_.get(req, 'kauth.grant.access_token.token')) {
            proxyReq.setHeader('x-authenticated-user-token', _.get(req, 'kauth.grant.access_token.token'));
        }
        proxyReq.setHeader('accept-encoding', req.headers['accept-encoding']);
    });
    proxyServer.on('proxyRes', function (proxyRes, req, res) {
        if (proxyRes.statusCode <= 399) {
            // console.log('status code is less than 399 pipe out proxy response to caller', proxyRes.headers);
            res.set(proxyRes.headers)
            return proxyRes.pipe(res);
        }
        let chunks = [];
        proxyRes.on("data", (chunk) => chunks.push(chunk));
        proxyRes.on("end", function () {
            let body = Buffer.concat(chunks);
            res.status(proxyRes.statusCode);
            console.log('got error from upstream server', body.toString());
            res.end(body.toString());
        });
    });
    return proxyServer
}