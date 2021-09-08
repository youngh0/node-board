const router = require('express').Router();
const boardController = require('../controllers/board.controller');

// 게시판 전체 글 조회
router.get('/list', boardController.getBoardList);

// 게시글 건별 조회
router.get('/:board_id', boardController.getBoardDetail);

// 게시글 작성
router.post('/write', boardController.postBoard);

// 게시글 삭제
router.delete('/delete/:board_id', boardController.deleteBoard);

// 게시글 수정
router.put('/update/:board_id', boardController.updateBoard);



module.exports = router;
