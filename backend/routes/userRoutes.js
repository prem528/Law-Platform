const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// Route: POST /api/users/register
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;


