const db = require("../config/db")

exports.checkExistUser = async (email) => {
    const connection = await db.getConnection(async conn => conn);
    const isExist = await connection.query('SELECT * FROM USER WHERE email=?', email)

    //release를 해줘야 하나?? 바로 createUser에서 쿼리 날려야 하는데
    connection.release()
    console.log(isExist[0].length)


    return isExist[0]
}

exports.createUser = async (email, password, nickname) => {
    const connection = await db.getConnection(async conn => conn);
    await connection.query('INSERT INTO USER(email, password, nickname) VALUES(?,?,?)', [email, password, nickname])
    connection.release()


}

exports.login = async (email) => {
    const connection = await db.getConnection(async conn => conn);
    const password = await connection.query('SELECT password FROM USER WHERE email = ?', email);
    connection.release()

    return password[0][0].password
}
