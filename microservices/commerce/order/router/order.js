const express = require("express");
const router = express.Router();

const Ordercontroller = require("../controller/order");

router.post("/orderup", Ordercontroller.createOrder);

module.exports = router;