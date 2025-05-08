const express = require("express");
const { submitCase, getMyCases } = require("../controllers/caseController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Protected route to submit a case
router.post("/submit", protect, submitCase);
router.get("/mine", protect, getMyCases);

module.exports = router;
