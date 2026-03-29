const db = require("./database");

const createTables = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS orders (
            id          SERIAL PRIMARY KEY,
            user_id     INTEGER NOT NULL,
            total_amount NUMERIC(10, 2) NOT NULL,
            currency    VARCHAR(10) DEFAULT 'KES',
            status      VARCHAR(20) DEFAULT 'pending',
            created_at  TIMESTAMP DEFAULT NOW(),
            updated_at  TIMESTAMP DEFAULT NOW()
        );
    `);

    await db.query(`
        CREATE TABLE IF NOT EXISTS order_items (
            id          SERIAL PRIMARY KEY,
            order_id    INTEGER REFERENCES orders(id) ON DELETE CASCADE,
            product_id  VARCHAR(255) NOT NULL,
            name        VARCHAR(255) NOT NULL,
            price       NUMERIC(10, 2) NOT NULL,
            quantity    INTEGER NOT NULL,
            subtotal    NUMERIC(10, 2) NOT NULL
        );
    `);

    console.log("Tables created ✅");
};

createTables();

module.exports = createTables;