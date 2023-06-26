const mssql = require("mssql");
const Constants = require('../utils/constants');
require('dotenv').config();


let config = {
       
    server: Constants.DB_HOST,
    authentication: {
        type: "default",
        options: {
            userName: Constants.DB_USERNAME,
            password: Constants.DB_PASSWORD
        }
    },
    options: {
        port: Constants.DB_PORT,
        database: Constants.DB_DATABASE,
        encrypt: true,
        enableArithAbort: true
        }
}
console.log(JSON.stringify(config));

mssql.connect(config, function(err) {
    if (err) throw err;
    console.log("Connected!");
    });

module.exports = mssql;
