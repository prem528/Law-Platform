const express = require("express");
const { submitCase,
    getMyCases,
    getSingleCase,
    uploadDocument,
    getCaseDocuments,
    allCaseDocuments } = require("../controllers/caseController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Protected route to submit a case
router.post("/submit", protect, submitCase);
router.get("/mine", protect, getMyCases);
router.get("/:id", protect, getSingleCase);
router.post("/:caseId/documents", protect, upload.single("file"), uploadDocument);
router.get("/:caseId/documents", protect, getCaseDocuments);
router.get("/documents/mine", protect, allCaseDocuments)


module.exports = router;
