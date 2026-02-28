const db = require('../config/Sql-database');

const findByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM user_new WHERE email = ?', [email]);
  return rows[0] || null; // return the user or null if not found
};

const create = async ({ username, email, password }) => {
  const [result] = await db.execute(
    'INSERT INTO user_new (username, email, password_hash) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return { id: result.insertId, username, email };
};

//login
const login = async (email) => {
    const [rows] = await db.execute(
        'SELECT * FROM user_new WHERE email = ?',
        [email]
    );
    return rows[0] || null;
};
module.exports = { findByEmail, create, login };