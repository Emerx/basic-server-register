const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const express = require('express');

const { saltRounds, jwtSecret } = require('../config/constants')
const { pool, validatePassword, findUser } = require('../config/database')

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds)

  // Store hash in your password DB.
  const qry = `INSERT INTO users(id, username, password) VALUES ($1, $2, $3)`;
  const values = [uuid(), username, hash];
  const client = await pool.connect()
  try {
    const result = await client.query(qry, values)
    res.send({ success: result.rowCount === 1 });
  } catch (err) {
    res.status(409).send({ success: false, message: "Username already in use", err })
  } finally {
    client.end();
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser(username);

  if (user !== null && await validatePassword(user, password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: 60 * 60 });
    res.json({ token })
  } else {
    res.status(404).json({ message: 'Authentication failed' })
  }

});

module.exports = router
