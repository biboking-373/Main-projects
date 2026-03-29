const {Pool} = require('pg');

const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 6000
})

db.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

db.on('error', (err) => {
    console.error('Unexpected PG Error', err);
    process.exit(1);
});

module.exports = db

