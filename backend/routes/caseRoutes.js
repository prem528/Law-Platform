const express = require("express");
const { PrismaClient } = require("@prisma/client"); 
const prisma = new PrismaClient();

const { submitCase,
    getMyCases,
    getSingleCase,
    uploadDocument,
    getCaseDocuments,
    allCaseDocuments } = require("../controllers/caseController");
const { protect } = require("../middlewares/authMiddleware");
const { upload, uploadToR2 } = require("../middlewares/uploadToR2");

const router = express.Router();

// Protected routes
router.post("/submit", protect, upload.single("file"), uploadToR2, submitCase);
router.get("/mine", protect, getMyCases);
router.get("/:id", protect, getSingleCase);
router.get("/:caseId/documents", protect, getCaseDocuments);
router.get("/documents/mine", protect, allCaseDocuments)

router.post("/:caseId/documents", protect, upload.single("file"), uploadToR2, uploadDocument);


module.exports = router;
