const dotenv = require('dotenv');
dotenv.config()
const mysql = require('mysql2/promise');

const pool = {
    host     : '172.18.0.2',
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD ,
    port: process.env.DB_PORT,
    database : process.env.DB_NAME,
    connectionLimit : 30
}



module.exports = mysql.createPool(pool);
