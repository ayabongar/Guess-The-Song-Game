const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "GuessTheSong",
    port: 3306,
    namedPlaceholders: true
});

connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySQL Connected");
});

module.exports = connection;