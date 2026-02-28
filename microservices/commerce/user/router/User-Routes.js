const express = require("express");
const router = express.Router();

const { validateRegister, validateLogin} = require("../middleware/User-Middleware")
const userController = require("../controller/User-Controller");


router.post("/create-user", 
    validateRegister,
    userController.register,
);

router.post("/login",
    validateLogin,
    userController.login,
);

module.exports = router;