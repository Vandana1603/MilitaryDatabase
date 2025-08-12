require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const app = express();
const sessions = {}; // In-memory session store

dotenv.config();
app.use(cors());
app.use(express.json());

module.exports.sessions = sessions;

// Login route with error handling
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const db = mysql.createPool({
      host: process.env.DB_HOST,
      user: username,
      password: password,
      database: process.env.DB_NAME
    }).promise();

    // Test credentials by attempting a simple query
    await db.query('SELECT 1');

    // Save session
    const token = Math.random().toString(36).substring(2);
    sessions[token] = { username, password };
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(401).json({ error: 'Invalid MySQL login: ' + err.message });
  }
});

// Route handlers (ensure these are defined after sessions)
app.use('/api/personnel', require('./routes/personnel'));
app.use('/api/logistics', require('./routes/logistics'));
app.use('/api/mission', require('./routes/mission'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
