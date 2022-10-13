const developmentLogger = require('./developmentLogger')
const productionLogger = require('./productionLogger')
require("dotenv").config()

let logger = null;

if (process.env.NODE_ENV === "development") {
    logger = developmentLogger()
}

if (process.env.NODE_ENV === "production") {
    logger = productionLogger()
}

module.exports = logger;