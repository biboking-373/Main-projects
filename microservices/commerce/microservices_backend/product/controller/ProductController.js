const product = require("../models/Product");
const axios = require("axios");

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:4890";

exports.addProduct = async (req, res) => {
    const { name, price} = req.body;
    const userId = req.user.id; // ✅ from the verified JWT, not req.body


    if (!userId){
        return res.status(400).json({message: "The userId needs to be filled"});
    }

    try{
        const userResponse = await axios.get(`${USER_SERVICE_URL}/user/${userId}`);

        const productt = await product.create({ name, price, userId });
        res.status(201).json(productt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// 👇 add this
exports.getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const productt = await product.findById(id);
        if (!productt) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(productt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}