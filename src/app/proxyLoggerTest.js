const { ProxyLogger } = require("@project-sunbird/logger/decorator");
async function echo(req){
    return req.body ? req.body : req.originalUrl;
}

module.exports = { echo }

// module.exports = ProxyLogger({ echo }, 'ProxyLoggerTest');