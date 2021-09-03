const router = require('express').Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const db = require('../config/db')

router.post('/join',((req, res) => {
    const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const {email, password, nickname} = req.body;

    // email 유효성 검사
    if(email !== '' && email !== 'undefined' && regex.test(email)){

        // email 중복 검사
        db.connection.query('SELECT * FROM USER WHERE email=?',email, (err, data) => {
            console.log(data.length)

            // 가입 가능한 메일 (중복x)
            if(data.length===0){

                bcrypt.hash(password,10,(err, hashPwd) => {
                    if(err) console.log(err)
                    else {
                        bcrypt.compare(password, hashPwd, (err,zz)=>{
                            if(err) console.log(err)
                            else {
                                db.connection.query('INSERT INTO USER(email, password, nickname) VALUES(?,?,?)', [email,hashPwd,nickname], (err, data)=>{
                                    if(err) console.log(err)
                                    else res.status(201).json(data)
                                })
                                console.log("가능")
                            }
                        })
                    }
                })

            }
            // 가입 불가능한 메일 (중복o)
            else {
                res.send("이미 존재")
                console.log("불가능")
            }
        });
    }
    else {
        console.log("fail")
        // res.json({msg:"fail"})
    }


}))

module.exports = router;
