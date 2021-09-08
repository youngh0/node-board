const boardModel = require('../models/board.model')

// 게시글 전체 리스트
exports.getBoardList = async (req, res) => {
    try{
        res.json({msg: await boardModel.getBoardList()})
    }
    catch (e) {
        res.status(500).send("message : Internal Server Error");
    }
}

//게시글 건별 조회
exports.getBoardDetail = async (req, res) => {
    try{
        const board_id = req.params.board_id;
        res.json({msg: await boardModel.getBoardDetail(board_id)})
    }
    catch (e) {
        res.status(500).send("message : Internal Server Error");
    }
}

// 게시글 작성
exports.postBoard = async (req, res) => {
    try{
        const{title, body, user_id} = req.body

        if(!title || !body){res.status(400).send("message : input something")}
        else{
            await boardModel.writeBoard(title,body,user_id)
            res.status(201).send("message: success create");

        }
    }
    catch (e) {
        res.status(500).send("message : Internal write post Server Error");
    }
}

// 게시글 삭제
exports.deleteBoard = async (req, res) => {
    try{
        const board_id = req.params.board_id;
        await boardModel.deleteBoard(board_id);
        res.status(200).json({msg: "delete success"})
    }
    catch (e) {
        res.status(500).send("message : Internal delete board Server Error");
    }
}

// 게시글 수정
exports.updateBoard = async (req, res) => {
    try{
        const{
            title,
            body,
        } = req.body;
        const board_id = req.params.board_id;

        await boardModel.updateBoard(title, body, board_id);
        res.status(200).json({msg: "update success"})
    }
    catch (e) {
        res.status(500).send("message : Internal update board Server Error");
    }
}
