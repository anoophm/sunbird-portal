const { ProxyLogger } = require("@project-sunbird/logger/decorator");
async function echo(req){
    return req.body;
}

module.exports = { echo }

// module.exports = ProxyLogger({ echo }, 'ProxyLoggerTest');