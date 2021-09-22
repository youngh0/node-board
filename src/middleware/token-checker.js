const jwt = require("jsonwebtoken");

exports.checkToken = (req,res, next) => {
    // header에 토큰 있는지 없는지 검사
    if (req.headers.authorization.split('Bearer ')[1]) {
        const token = req.headers.authorization.split('Bearer ')[1];

        // 유효한 token인지 검사
        jwt.verify(token, process.env.JWT_KEY, (err, result) => {
            if (err) {
                res.status(401).json({error: 'Auth Error from authChecker'});

            }
            else{
                next()
                // res.status(200).json({msg: "valid token"})
                // return true
            }
        })
    }
    else{
        console.log("third")
        res.status(400).json({msg: "please input your token in header"})
        // return false
    }
}
