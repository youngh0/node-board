const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.join = async (req, res) => {
    try {
        const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const {email, password, nickname} = req.body;
        if (email !== '' && email !== 'undefined' && regex.test(email)) {
            // DB에 이미 이메일이 존재하는지 검사
            const isExist = await userModel.checkExistUser(email)

            // 존재할 경우
            if (isExist.length > 0) res.status(400).json({msg: "exist email"})

            // 가입 가능
            else {
                const hashing = await bcrypt.hash(password, 10);

                // DB에 저장
                await userModel.createUser(email, hashing, nickname)
                res.status(201).json({msg: "create user"})
            }
        } else {
            res.status(400).json({msg: "please input all info(email, password, nickname)"})
        }
    } catch (e) {
        res.status(500).send("message : Internal Server Error");
    }
    // res.json({msg: "this is user/join/controller"})
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // DB에 저장되어 있는 비밀번호 가져오기
        const comparePwd = await userModel.login(email)

        const isMatch = await bcrypt.compare(password, comparePwd)
        // 올바른 비밀번호
        if (isMatch) {
            const token = jwt.sign(
                {email},
                process.env.JWT_KEY,
                {expiresIn: '1d'}
            )
            // console.log(token)
            // console.log(jwt.decode(token,process.env.JWT_KEY))
            res.status(200).json({token: token})
        }
        // 잘못된 비밀번호
        else {
            res.status(400).json({msg: "wrong password"})
        }
    } catch (e) {
        res.status(500).send("message : Internal Server Error");
    }

}

// exports.checkToken = async (req,res) => {
//     console.log(req.headers.authorization.split('Bearer ')[1])
//         // header에 토큰 있는지 없는지 검사
//         if (req.headers.authorization.split('Bearer ')[1]) {
//             const token = req.headers.authorization.split('Bearer ')[1];
//
//             // 유효한 token인지 검사
//             jwt.verify(token, process.env.JWT_KEY, (err, result) => {
//
//                 if (err) {
//                     console.log("first")
//                     res.end(401).json({error: 'Auth Error from authChecker'});
//
//                     // return false;
//                 }
//                 else{
//                     console.log("second")
//                     // res.status(200).json({msg: "valid token"})
//                     // return true
//                 }
//             })
//         }
//         else{
//             console.log("third")
//             res.status(400).json({msg: "please input your token in header"})
//             // return false
//         }
// }
