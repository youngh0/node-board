const db = require("../config/db")

exports.getBoardList = async () => {
    const connection = await db.getConnection(async conn => conn);
    const board_data = await connection.query('SELECT * FROM BOARD');
    console.log(board_data[0])
    connection.release()

    return board_data[0]
}

exports.getBoardDetail = async (board_id) => {
    const connection = await db.getConnection(async conn => conn);
    const data = await connection.query('SELECT * FROM BOARD WHERE board_id = ?', board_id);
    connection.release()

    return data[0]
}

// 게시글 작성
exports.writeBoard = async (title, body, user_id) => {
    let query = 'INSERT INTO BOARD(title, body, fk_user_id) VALUES(?,?,?)'
    const connection = await db.getConnection(async conn => conn);

    await connection.query(query,[title,body,user_id]);

    connection.release()
}

// 게시글 삭제
exports.deleteBoard = async (board_id) => {
    const connection = await db.getConnection(async conn => conn);
    let query = 'DELETE FROM BOARD WHERE board_id = ?'
    const result = await connection.query(query,board_id)
    console.log(result)

    connection.release()
}

// 게시글 수정
exports.updateBoard = async (title, body, board_id) => {
    const connection = await db.getConnection(async conn => conn);

    const query = 'UPDATE BOARD SET title=?,body=? WHERE board_id = ?'

    await connection.query(query, [title, body, board_id]);
    connection.release()
}
