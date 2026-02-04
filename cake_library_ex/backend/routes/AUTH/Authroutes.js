const express = require("express");
const router = express.Router();
const { register, login, logout, checkAuth} = require('../../controller/Authcontroller.js');
const { authmid } = require("../../middleware/Authmiddleware");

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-me', authmid, checkAuth)

module.exports = router;