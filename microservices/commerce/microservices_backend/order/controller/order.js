const axios = require("axios");
const orderRepo = require("../repository/orderRepoistory");

const USER_SERVICE_URL    = process.env.USER_SERVICE_URL    || "http://localhost:4890";
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:8900";

exports.addOrder = async (req, res) => {
    const { items } = req.body;
    const userId = req.user.id;
    const token = req.headers.authorization; // ✅ grab the token from the request

    try {
        // 1. verify user exists — forward the token
        await axios.get(`${USER_SERVICE_URL}/user/${userId}`, {
            headers: { Authorization: token } // ✅
        });

        // 2. verify each product — forward the token
        const orderItems = await Promise.all(
            items.map(async (item) => {
                const { data: productData } = await axios.get(
                    `${PRODUCT_SERVICE_URL}/product/${item.productId}`,
                    {
                        headers: { Authorization: token } // ✅
                    }
                );
                return {
                    productId: productData._id,
                    name:      productData.name,
                    price:     productData.price,
                    quantity:  item.quantity,
                    subtotal:  productData.price * item.quantity,
                };
            })
        );

        // 3. calculate total
        const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

        // 4. save order then items
        const order = await orderRepo.createOrder({ userId, totalAmount });
        const savedItems = await orderRepo.createOrderItems(order.id, orderItems);

        res.status(201).json({ ...order, items: savedItems });

    } catch (err) {
        if (err.response?.status === 404) {
            return res.status(404).json({ message: "User or Product not found" });
        }
        if (err.response?.status === 401) {
            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderRepo.findOrderById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await orderRepo.findOrdersByUserId(userId);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};