const userModel = require("../models/user.model")
// const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {BadRequest} = require("../error/errors")

exports.join = async (req, res, next) => {
    try {
        const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const {email, password, nickname} = req.body;
        if (email !== '' && email !== 'undefined' && regex.test(email)) {
            // DB에 이미 이메일이 존재하는지 검사
            const isExist = await userModel.checkExistUser(email)

            // 존재할 경우
            if (isExist.length > 0) throw new BadRequest("exist email");

            // 가입 가능
            // else {
            //     const hashing = await bcrypt.hash(password, 10);

            //     // DB에 저장
            //     await userModel.createUser(email, hashing, nickname)
            //     res.status(201).json({
            //         status: 201,
            //         msg: "create user"
            //     })
            // }
        } else {
            throw new BadRequest("have to input email, password, nickname");
        }
    } catch (e) {
        next(e)
    }
    // res.json({msg: "this is user/join/controller"})
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        // DB에 저장되어 있는 비밀번호 가져오기
        const comparePwd = await userModel.login(email)

        // const isMatch = await bcrypt.compare(password, comparePwd)
        // // 올바른 비밀번호
        // if (isMatch) {
        //     const token = jwt.sign(
        //         {email},
        //         process.env.JWT_KEY,
        //         {expiresIn: '1d'}
        //     )
        //     // console.log(token)
        //     // console.log(jwt.decode(token,process.env.JWT_KEY))
        //     res.status(200).json({
        //         status: 200,
        //         token: token
        //     })
        // }
        // 잘못된 비밀번호
        // else {
        //     throw new BadRequest("wrong password")
        // }
    } catch (e) {
        next(e)
    }

}
