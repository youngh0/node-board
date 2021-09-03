const router = require('express').Router();
const mysql = require('mysql2');
const db = require('../config/db')

// 전체 게시글 목록 조회
router.get('/list',((req, res) => {


    db.connection.query('SELECT * FROM BOARD', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
    });

}))

// 게시글 건별 조회 - board_id로
router.get('/:board_id',((req, res) => {



    let query = 'SELECT * FROM BOARD WHERE board_id = ?'

    db.connection.query(query, req.params.board_id, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
        console.log(rows)
    });

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



    let query = 'INSERT INTO BOARD(title, body, fk_user_id) VALUES(?,?,?)'

    db.connection.query(query, [title, body, fk_user_id], function(err, rows, fields) {
        if (err) throw err;
        res.status(201)
        console.log(rows)
    });


}))

router.delete('/delete/:board_id',((req, res) => {


    let query = 'DELETE FROM BOARD WHERE board_id = ?'

    db.connection.query(query, req.params.board_id, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
        console.log(rows)
    });
;
}))

// 게시글 update - 나중에 사용자 검증 기능 필요
router.put('/update',((req, res) => {
    const{
        title,
        body,
        board_id,
    } = req.query


    let query = 'UPDATE BOARD SET title=?,body=? WHERE board_id = ?'

    db.connection.query(query, [title,body,board_id], function(err, rows, fields) {
        if (err) throw err;
        res.json(rows)
        console.log(rows)
    });

}))

module.exports = router;
