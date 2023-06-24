import { config } from 'dotenv';
import mysql from 'mysql2'

const connectionPool = mysql.createPool({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "GuessTheSong",
    port: 3306,
    namedPlaceholders: true
});

// export const execSQL = (sql, parameters) => 
//     new Promise((resolve, reject) => {

//         const connection = connectionPool.getConnection();

//         connection.format(sql, parameters);

//         connection.connect((err) => {
//             if (err) throw err;

//             connection.query(sql, parameters, (err, result) => {
//                 if (err) throw reject(err);
//                 resolve(result);
//                 connection.end();
//             });
//         });
// })

export const execSQL = async (sql, parameters) => {
    const pool = connectionPool.promise();
    return pool.query(sql, parameters);
}