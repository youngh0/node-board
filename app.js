const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();

const board = require('./src/routes/board-route')
const user = require('./src/routes/user-route')
const comment = require('./src/routes/comment-route')

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});


// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',((req, res) => {
    res.json({'test': 'test'})
}))

app.use('/board',board)
app.use('/user',user)
app.use('/comment',comment)
