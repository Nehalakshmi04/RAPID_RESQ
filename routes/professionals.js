const express = require('express');
const router = express.Router();

// Define routes for professionals endpoint
router.get('/', (req, res) => {
  res.send('Professionals endpoint');
});

module.exports = router;