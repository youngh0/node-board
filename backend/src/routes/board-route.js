const router = require('express').Router();
const boardController = require('../controllers/board.controller');
const checkToken = require("../middleware/token-checker")

// 게시판 전체 글 조회
router.get('/list', boardController.getBoardList);

// 게시글 건별 조회
router.get('/:board_id', boardController.getBoardDetail);

// 게시글 작성, 로그인 권한 필요 -> checkToken 미들웨어 사용
router.post('/write', checkToken.checkToken, boardController.postBoard);

// 게시글 삭제, 로그인 권한 필요 -> checkToken 미들웨어 사용
router.delete('/delete/:board_id', checkToken.checkToken, boardController.deleteBoard);

// 게시글 수정, 로그인 권한 필요 -> checkToken 미들웨어 사용
router.put('/update/:board_id', checkToken.checkToken, boardController.updateBoard);



module.exports = router;
