const envHelper = require('../helpers/environmentVariablesHelper.js')
const learnerURL = envHelper.LEARNER_URL
const proxy = require('express-http-proxy')
const _ = require('lodash');
const request = require("request");
const http = require('http');
const https = require('https');
const healthService = require('../helpers/healthCheckService.js')
const whitelistUrls = require('../helpers/whitellistUrls.js')
const permissionsHelper = require('../helpers/permissionsHelper.js')
const reqDataLimitOfContentUpload = '50mb'
const proxyUtils = require('../proxy/proxyUtils.js')
const logger = require('sb_logger_util_v2')
const sunbirdApiAuthToken = envHelper.PORTAL_API_AUTH_TOKEN
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
const contentProxyUrl = envHelper.CONTENT_PROXY_URL

module.exports = app => {

    app.use('/action/*', (req, res, next) => {
        console.log("Got request for user request package", req.originalUrl);
        next();
      }, (orgReq, orgRes) => {
        delete orgReq.headers['host'];
        delete orgReq.headers['connection'];
        orgReq.headers['x-authenticated-user-token'] = _.get(orgReq, 'kauth.grant.access_token.token');
        orgReq.headers.Authorization = 'Bearer ' + sunbirdApiAuthToken
    
        const options = {
            method: orgReq.method,
            forever: true,
            url: `${contentProxyUrl}${orgReq.originalUrl}`,
            headers: orgReq.headers
        };
        console.log('action url to request', options.url);
        request(options, (error, response = {}, body = {}) => {
            if (error) {
              orgRes.status(500);
                return orgRes.send({ message: error.reason, code: error.code, options });
            };
            orgRes.status(response.statusCode);
            orgRes.send(body);
        });
      })
}
