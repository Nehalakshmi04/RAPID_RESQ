
const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "Register endpoint hit" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login endpoint hit" });
});

module.exports = router;
