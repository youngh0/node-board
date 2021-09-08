const router = require('express').Router();

const userController = require("../controllers/user.controller");

router.post('/join', userController.join);
router.post('/login', userController.login)
router.post('/check', userController.check)

module.exports = router;
