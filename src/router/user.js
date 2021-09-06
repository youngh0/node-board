const dotenv = require('dotenv');
dotenv.config()
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db')

router.post('/join', (async (req, res) => {
    const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    try {
        const connection = await db.getConnection(async conn => conn);
        const {email, password, nickname} = req.body;
        // email 유효성 검사
        if (email !== '' && email !== 'undefined' && regex.test(email)) {
            // email 중복 검사
            const isExist = await connection.query('SELECT * FROM USER WHERE email=?', email);

            // 이미 존재
            if (isExist[0].length === 1) res.status(401).send("message: exist email")
            else {
                // 비밀번호 해시함수 적용
                await bcrypt.hash(password, 10)
                    .then(async (hashing) => {
                        await connection.query('INSERT INTO USER(email, password, nickname) VALUES(?,?,?)', [email, hashing, nickname]);
                        res.status(201).send("message: create user")
                    })
                    .catch()
            }
        } else {
            console.log("fail")
            // res.json({msg:"fail"})
        }
    } catch (e) {
        res.status(500).send("message : Internal Server Error");
    }
}))

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const connection = await db.getConnection(async conn => conn);

        const user = await connection.query('SELECT password FROM USER WHERE email = ?', email);
        await console.log(user)

        const isMatch = await bcrypt.compare(password, user[0][0].password)
        if (isMatch) {
            const token = jwt.sign(
                {
                    email
                }, process.env.JWT_KEY,
                {expiresIn: '1m',}
            )
            console.log(token)
            res.cookie('user', token);
            res.json({token: token})
        }
        // 비밀번호 불일치
        else {
            res.status(401).send("message: wrong password")
        }
    } catch (e) {
        res.status(500).send("message : Internal Server Error");
    }

})

router.post('/check', ((req, res, next) => {
    if (req.headers.authorization.split('Bearer ')[1]) {
        const token = req.headers.authorization.split('Bearer ')[1]
        // 토큰 만료 검사
        jwt.verify(token, process.env.JWT_KEY, (err, result) => {
            if (err) {
                res.status(401).json({error: 'Auth Error from authChecker'});
            } else {
                console.log(result)
                res.send("message: success authorization")
            }
        });
    } else {
        res.json({msg: "please input token in header"})
    }
}))

module.exports = router;
