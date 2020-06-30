const envHelper = require('../helpers/environmentVariablesHelper.js')
const learnerURL = envHelper.LEARNER_URL
const proxy = require('express-http-proxy')
const _ = require('lodash');
const request = require("request");
const http = require('http');
const https = require('https');
const httpsAgent = new https.Agent({ keepAlive: true });
const httpAgent = new http.Agent({ keepAlive: true });
const healthService = require('../helpers/healthCheckService.js')
const whitelistUrls = require('../helpers/whitellistUrls.js')
const permissionsHelper = require('../helpers/permissionsHelper.js')
const reqDataLimitOfContentUpload = '50mb'
const proxyUtils = require('../proxy/proxyUtils.js')
const logger = require('sb_logger_util_v2')
const sunbirdApiAuthToken = envHelper.PORTAL_API_AUTH_TOKEN

module.exports = app => {

    // app.all('/learner/course/v1/user/enrollment/list/:userId', // without any middleware
    //     proxy(learnerURL, { proxyReqPathResolver: req => req.originalUrl.replace('learner', 'api') }));

    // app.all('/learner/course/v1/user/enrollment/list/:userId', // with all middleware and server middleware also added
    //     healthService.checkDependantServiceHealth(['LEARNER', 'CASSANDRA']),
    //     whitelistUrls.isWhitelistUrl(),
    //     permissionsHelper.checkPermission(),
    //     proxy(learnerURL, { proxyReqPathResolver: req => req.originalUrl.replace('learner', 'api') }));

    // app.all('/learner/course/v1/user/enrollment/list/:userId', // with all middleware and server middleware and proxy methods
    //     healthService.checkDependantServiceHealth(['LEARNER', 'CASSANDRA']),
    //     whitelistUrls.isWhitelistUrl(),
    //     permissionsHelper.checkPermission(),
    //     proxy(learnerURL, { proxyReqPathResolver: req => req.originalUrl.replace('learner', 'api'),
    //         limit: reqDataLimitOfContentUpload,
    //         proxyReqOptDecorator: proxyUtils.decorateRequestHeaders(),
    //         userResDecorator: (proxyRes, proxyResData, req, res) => {
    //             try {
    //                 const data = JSON.parse(proxyResData.toString('utf8'));
    //                 if (req.method === 'GET' && proxyRes.statusCode === 404 && (typeof data.message === 'string' && data.message.toLowerCase() === 'API not found with these values'.toLowerCase())) res.redirect('/')
    //                 else return proxyUtils.handleSessionExpiry(proxyRes, proxyResData, req, res, data);
    //             } catch (err) {
    //                 logger.error({ msg: 'content api user res decorator json parse error:', proxyResData, error: JSON.stringify(err) })
    //                 return proxyUtils.handleSessionExpiry(proxyRes, proxyResData, req, res);
    //             }
    //         }
    //     }));

    app.all('/learner/course/v1/user/enrollment/list/:userId', (req, res) => { // enabling keep alive
        delete req.headers['host'];
        delete req.headers['connection'];
        req.headers['x-authenticated-user-token'] = _.get(req, 'kauth.grant.access_token.token');
        req.headers.Authorization = 'Bearer ' + sunbirdApiAuthToken

        const options = {
            method: req.method,
            agent: learnerURL.startsWith('https:') ? httpsAgent : httpAgent,
            url: `${learnerURL}${req.originalUrl.replace('/learner/', '')}`,
            headers: req.headers
        };
        request(options, (error, response = {}, body = {}) => {
            if (error) {
                res.status(500);
                return res.send({ message: error.reason, code: error.code, options });
            };
            res.status(response.statusCode);
            res.send(body);
        });
    });
}
