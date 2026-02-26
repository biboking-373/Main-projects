const db = require("../config/database");
const axios = require("axios");

function calculateprice(quantity, price){
    return quantity * price
}
exports.createOrder = async (req,res) => {
    const { userid, productid,quantity } = req.body;

    try{

        
        const product = await axios.get(`http://localhost:8900/product/product-mine/${productid}`);
        if (!product.data) return res.status(404).json({ message: 'Product not found' })
        
            const total_price = calculateprice(quantity, product.data.price);

        const result = await db.query(
            `INSERT INTO orders (user_id, product_id, quantity, total_price, currency, status)
             VALUES ($1, $2, $3, $4, $5, 'Paid') RETURNING *`,
            [userid, productid, quantity, total_price, product.data.currency]
        );

        res.status(201).json({
            message: 'Order created successfully',
            order: result.rows[0]
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    };

}