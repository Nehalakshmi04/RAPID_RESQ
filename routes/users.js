const express = require('express');
const router = express.Router();

// Define routes for users endpoint
router.get('/', (req, res) => {
  res.send('Users endpoint');
});

module.exports = router;