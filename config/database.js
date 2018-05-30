const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:sa@localhost:5432/test';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || connectionString,
  ssl: process.env.DATABASE_URL !== undefined
});

const findUser = async (username) => {
  const client = await pool.connect();
  const result = await client.query('Select id, username, password from users where username = $1', [username]);
  await client.end();
  return (result.rows.length > 0) ? result.rows[0] : null
}

const validatePassword = async (user, password) => await bcrypt.compare(password, user.password)

module.exports = {
  pool,
  findUser,
  validatePassword
}



