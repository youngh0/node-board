const dotenv = require('dotenv');
dotenv.config()
const mysql = require('mysql2');

module.exports = {
    connection: mysql.createConnection({
        host     : 'localhost',
        database : process.env.DB_NAME,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD ,
        port: process.env.DB_PORT
    })
}
