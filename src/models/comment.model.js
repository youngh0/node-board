const db = require("../config/db")

exports.createComment = async (args) => {
    const {writerId, boardId, body} = args;
    const connection = await db.getConnection(async conn => conn);
    let query = 'INSERT INTO COMMENT(fk_comment_userId, fk_comment_boardId, comment_body) VALUES(?,?,?)'

    await connection.query(query,[writerId,boardId,body]);

    connection.release()
}
