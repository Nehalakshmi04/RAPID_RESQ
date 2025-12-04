// routes/requests.js
const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Requests endpoint');
});

module.exports = router;
