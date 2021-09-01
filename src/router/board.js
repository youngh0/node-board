const router = require('express').Router();
const mysql = require('mysql2');

router.get('/list',((req, res) => {
    const connection = mysql.createConnection({
        host     : 'localhost',
        database : process.env.DB_NAME,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD ,
        port: process.env.DB_PORT
        // port 안넣으니 1045에러 발생
    });

    connection.connect();

    connection.query('SELECT * FROM USER', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
    });

    connection.end();
}))


module.exports = router;
