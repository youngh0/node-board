const router = require('express').Router();
const commentController = require('../controllers/comment.controller')
const tokenChecker = require('../middleware/token-checker')

router.post('/create', tokenChecker.checkToken,commentController.create)

module.exports = router;
