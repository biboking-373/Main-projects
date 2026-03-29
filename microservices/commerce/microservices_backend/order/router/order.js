const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/validate");
const orderController = require("../controller/order");

router.post("/",        protect, orderController.addOrder);      // create order
router.get("/mine",     protect, orderController.getUserOrders); // my orders
router.get("/:id",      protect, orderController.getOrder);      // get by id

module.exports = router;