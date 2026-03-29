const db = require("../config/database");

const createOrder = async ({ userId, totalAmount, currency }) => {
    const { rows } = await db.query(
        `INSERT INTO orders (user_id, total_amount, currency) 
         VALUES ($1, $2, $3) RETURNING *`,
        [userId, totalAmount, currency || "KES"]
    );
    return rows[0];
};

const createOrderItems = async (orderId, items) => {
    const insertedItems = await Promise.all(
        items.map(async (item) => {
            const { rows } = await db.query(
                `INSERT INTO order_items (order_id, product_id, name, price, quantity, subtotal)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [orderId, item.productId, item.name, item.price, item.quantity, item.subtotal]
            );
            return rows[0];
        })
    );
    return insertedItems;
};

const findOrderById = async (id) => {
    // get order
    const { rows: orderRows } = await db.query(
        `SELECT * FROM orders WHERE id = $1`, [id]
    );
    if (!orderRows[0]) return null;

    // get its items
    const { rows: itemRows } = await db.query(
        `SELECT * FROM order_items WHERE order_id = $1`, [id]
    );

    return { ...orderRows[0], items: itemRows };
};

const findOrdersByUserId = async (userId) => {
    const { rows: orders } = await db.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`, [userId]
    );

    // get items for each order
    const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
            const { rows: itemRows } = await db.query(
                `SELECT * FROM order_items WHERE order_id = $1`, [order.id]
            );
            return { ...order, items: itemRows };
        })
    );

    return ordersWithItems;
};

module.exports = { createOrder, createOrderItems, findOrderById, findOrdersByUserId };