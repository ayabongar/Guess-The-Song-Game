const mssql = require("mssql");
require('dotenv').config();


const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

var config = {
       
    server: DB_HOST,
    authentication: {
        type: "default",
        options: {
            userName: DB_USERNAME,
            password: DB_PASSWORD
        }
    },
    options: {
        port: DB_PORT,
        database: DB_DATABASE,
        encrypt: true,
        enableArithAbort: true
        }
}


mssql.connect(config, function(err) {
    if (err) throw err;
    console.log("Connected!");
    });

module.exports = mssql;