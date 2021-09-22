const router = require('express').Router();

const userController = require("../controllers/user.controller");

router.post('/join', userController.join);
router.get('/login', userController.login)

module.exports = router;
