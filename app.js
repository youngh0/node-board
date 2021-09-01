const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set('port', process.env.PORT || 3000);

var connection = mysql.createConnection({
    host     : 'localhost',
    database : process.env.DB_NAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD ,
    port: process.env.DB_PORT
    // port 안넣으니 1045에러 발생
});

connection.connect((err => {
    if (err) console.log(err);
    console.log("success")
}));

connection.query('SELECT * FROM USER', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].nickname);
});

connection.end();

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
