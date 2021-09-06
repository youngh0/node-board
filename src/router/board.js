const router = require('express').Router();
const db = require('../config/db')

// 전체 게시글 목록 조회
router.get('/list', (async (req, res) => {
    try {
        const connection = await db.getConnection(async conn => conn);

        const board_data = await connection.query('SELECT * FROM BOARD');
        connection.release();
        res.json(board_data)

    } catch (err) {
        res.status(500).send("message : Internal Server Error");
    }
}))

// 게시글 건별 조회 - board_id로
router.get('/:board_id', (async (req, res) => {
    try {
        const connection = await db.getConnection(async conn => conn);
        let query = 'SELECT * FROM BOARD WHERE board_id = ?'

        const data = await connection.query(query, req.params.board_id);
        connection.release();
        res.json(data)

    } catch (e) {
        res.status(500).send("message : Internal Server Error");
    }

}))

// 게시글 작성 - url query string으로 title, body받고 user_id는 나중에 회원기능 구현하면 수정할 예정
router.post('/write',(async (req, res) => {
    const{
        title,
        body,
        fk_user_id = 1,
    } = req.body

    if(!title || !body){res.status(400).send("message : input something")}
    else{
        try{
            let query = 'INSERT INTO BOARD(title, body, fk_user_id) VALUES(?,?,?)'
            const connection = await db.getConnection(async conn => conn);

            await connection.query(query,[title,body,fk_user_id]);
            connection.release()
            res.status(201).send("message: success create");
        }
        catch (e){
            res.status(500).send("message : Internal Server Error");
        }

    }
}))

router.delete('/delete/:board_id',(async (req, res) => {
    try{

        const connection = await db.getConnection(async conn => conn);
        let query = 'DELETE FROM BOARD WHERE board_id = ?'
        await connection.query(query,req.params.board_id)
            .then(()=>{
                res.status(202).send("message: success delete");
            })
            .catch((err) => {
                res.status(500).send("message : Internal Server Error");
            })
    }
    catch (e) {
        res.status(500).send("message : Internal Server Error");
    }
}))

// 게시글 update - 나중에 사용자 검증 기능 필요
router.put('/update',(async (req, res) => {
    try{
        const{
            title,
            body,
            board_id,
        } = req.body;
        const connection = await db.getConnection(async conn => conn);

        const query = 'UPDATE BOARD SET title=?,body=? WHERE board_id = ?'

        await connection.query(query, [title, body, board_id])
            .then(() => res.status(201).send("message: success update"))
            .catch((e)=>res.status(400).send("message : fail"))

    }
    catch (e) {
        res.status(500).send("message : Internal Server Error");
    }
}))

module.exports = router;
