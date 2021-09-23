const jwt = require("jsonwebtoken");
const {BadRequest} = require("../error/errors");

exports.checkToken = (req,res, next) => {
    // header에 토큰 있는지 없는지 검사
    if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1];

        // 유효한 token인지 검사
        jwt.verify(token, process.env.JWT_KEY, (err, result) => {
            if (err) {
                throw new BadRequest("invalid token")
            }
            else{
                next()
                // res.status(200).json({msg: "valid token"})
                // return true
            }
        })
    }
    else{
        throw new BadRequest("please input your token in header")

        // return false
    }
}
