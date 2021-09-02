const router = require('express').Router();
const mysql = require('mysql2');

// 전체 게시글 목록 조회
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

    connection.query('SELECT * FROM BOARD', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
    });

    connection.end();
}))

// 게시글 건별 조회 - board_id로
router.get('/:board_id',((req, res) => {

    const connection = mysql.createConnection({
        host     : 'localhost',
        database : process.env.DB_NAME,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD ,
        port: process.env.DB_PORT
        // port 안넣으니 1045에러 발생
    });

    connection.connect();

    let query = 'SELECT * FROM BOARD WHERE board_id = ?'

    connection.query(query, req.params.board_id, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
        console.log(rows)
    });

    connection.end();
}))

// 게시글 작성 - url query string으로 title, body받고 user_id는 나중에 회원기능 구현하면 수정할 예정
router.post('/write',((req, res) => {
    console.log(req.query)
    const{
        title,
        body,
        fk_user_id = 1,
    } = req.query
    console.log(title)
    console.log(body)
    console.log(fk_user_id)

    const connection = mysql.createConnection({
        host     : 'localhost',
        database : process.env.DB_NAME,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD ,
        port: process.env.DB_PORT
        // port 안넣으니 1045에러 발생
    });

    connection.connect();

    let query = 'INSERT INTO BOARD(title, body, fk_user_id) VALUES(?,?,?)'

    connection.query(query, [title, body, fk_user_id], function(err, rows, fields) {
        if (err) throw err;
        res.status(201)
        console.log(rows)
    });

    connection.end();
}))

router.delete('/delete/:board_id',((req, res) => {
    console.log(req.params.board_id)
    const connection = mysql.createConnection({
        host     : 'localhost',
        database : process.env.DB_NAME,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD ,
        port: process.env.DB_PORT
        // port 안넣으니 1045에러 발생
    });

    connection.connect();

    let query = 'DELETE FROM BOARD WHERE board_id = ?'

    connection.query(query, req.params.board_id, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
        console.log(rows)
    });

    connection.end();
}))

// 게시글 update - 나중에 사용자 검증 기능 필요
router.put('/update',((req, res) => {
    const{
        title,
        body,
        board_id,
    } = req.query
    const connection = mysql.createConnection({
        host     : 'localhost',
        database : process.env.DB_NAME,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD ,
        port: process.env.DB_PORT
        // port 안넣으니 1045에러 발생
    });

    connection.connect();

    let query = 'UPDATE BOARD SET title=?,body=? WHERE board_id = ?'

    connection.query(query, [title,body,board_id], function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
        console.log(rows)
    });

    connection.end();
}))

module.exports = router;
