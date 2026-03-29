const express = require("express");
const router = express.Router();

const { validateRegister, validateLogin, protect} = require("../middleware/User-Middleware")
const userController = require("../controller/User-Controller");


router.post("/create-user", 
    validateRegister,
    userController.register,
);

router.post("/login",
    validateLogin,
    userController.login,
);

router.get("/:id",
    protect,
    userController.getUser
)

module.exports = router;