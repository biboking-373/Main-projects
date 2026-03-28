const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/producMiddleware");
const Productcontroller = require("../controller/ProductController");

router.post("/", protect,Productcontroller.addProduct);
router.get("/:id", protect, Productcontroller.getProduct);
router.get("/all", protect, Productcontroller.getAllProducts);

module.exports = router;


