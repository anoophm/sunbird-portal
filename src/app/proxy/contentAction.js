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
const proxyServer = require('./proxyService')(contentProxyUrl); // "https://httpbin.org/" || 

module.exports = app => {

  // app.use('/action/content/v3/read/*', (req, res, next) => {
  //     console.log("Got request for user request package", req.originalUrl);
  //     next();
  //   }, (orgReq, orgRes) => {
  //     delete orgReq.headers['host'];
  //     delete orgReq.headers['connection'];
  //     // delete orgReq.headers['accept-encoding'];
  //     orgReq.headers['x-authenticated-user-token'] = _.get(orgReq, 'kauth.grant.access_token.token');
  //     orgReq.headers.Authorization = 'Bearer ' + sunbirdApiAuthToken
  //     const options = {
  //         method: orgReq.method,
  //         forever: true,
  //         url: `${contentProxyUrl}${orgReq.originalUrl}`.replace('/action/content/v3/read/', '/v1/content/read/'),
  //         headers: orgReq.headers
  //     };
  //     console.log('action url to request', options);
  //     request(options, (error, response = {}, body = {}) => {
  //         if (error) {
  //           orgRes.status(500);
  //           return orgRes.send({ message: error.reason, code: error.code, options });
  //         };
  //         console.log(response.headers);
  //         // orgRes.setHeader("content-encoding", response.headers["content-encoding"]); orgRes.set(response.headers);
  //         orgRes.status(response.statusCode);
  //         orgRes.send(body);
  //     });
  //   })

  app.use('/action/content/v3/read/*', (orgReq, orgRes) => {
    orgReq.url = orgReq.originalUrl.replace('/action/content/v3/read/', '/v1/content/read/');
    // console.log('proxying with http-proxy package', orgReq.url);
    proxyServer.web(orgReq, orgRes);
  });

  // app.use('/action/content/v3/read/*', proxy(contentProxyUrl,
  //   { proxyReqPathResolver: req => req.originalUrl.replace('/action/content/v3/read/', '/v1/content/read/') }))
}
