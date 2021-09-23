const boardModel = require('../models/board.model')
const userController = require("../controllers/user.controller")
const {BadRequest} = require("../error/errors")
// 게시글 전체 리스트
exports.getBoardList = async (req, res, next) => {
    try{
        res.status(200).json({msg: await boardModel.getBoardList()})
    }
    catch (e) {
        next(e)
    }
}

//게시글 건별 조회
exports.getBoardDetail = async (req, res, next) => {
    try{
        const board_id = req.params.board_id;
        res.status(200).json({msg: await boardModel.getBoardDetail(board_id)})
    }
    catch (e) {
        next(e)
    }
}

// 게시글 작성
exports.postBoard = async (req, res, next) => {
    try{
        const{title, body, user_id} = req.body

        if(!title || !body){throw new BadRequest("input all")}
        else{
            await boardModel.writeBoard(title,body,user_id)
            res.status(201).send("message: success create");

        }
    }
    catch (e) {
        next(e)
    }
}

// 게시글 삭제
exports.deleteBoard = async (req, res, next) => {
    try{
        const board_id = req.params.board_id;
        await boardModel.deleteBoard(board_id);
        res.status(200).json({msg: "delete success"})
    }
    catch (e) {
        next(e)
    }
}

// 게시글 수정
exports.updateBoard = async (req, res, next) => {
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
        next(e)
    }
}
