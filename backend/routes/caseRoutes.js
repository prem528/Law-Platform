const express = require("express");
const { PrismaClient } = require("@prisma/client"); // ✅ Add this
const prisma = new PrismaClient(); // ✅ And this

const { submitCase,
    getMyCases,
    getSingleCase,
    uploadDocument,
    getCaseDocuments,
    allCaseDocuments } = require("../controllers/caseController");
const { protect } = require("../middlewares/authMiddleware");
const { upload, uploadToR2 } = require("../middlewares/uploadToR2");

const router = express.Router();

// Protected route to submit a case
router.post("/submit", protect, submitCase);
router.get("/mine", protect, getMyCases);
router.get("/:id", protect, getSingleCase);
// router.post("/:caseId/documents", protect, upload.single("file"), uploadDocument);
router.get("/:caseId/documents", protect, getCaseDocuments);
router.get("/documents/mine", protect, allCaseDocuments)

router.post("/:caseId/documents", protect, upload.single("file"), uploadToR2, async (req, res) => {
    try {
      const newDoc = await prisma.document.create({
        data: {
          filename: req.file.originalname,
          fileUrl: req.uploadedFileUrl,
          caseId: req.params.caseId,
          uploadedById: req.user.id,
        },
      });
  
      res.status(201).json({ message: "Document uploaded", document: newDoc });
    } catch (err) {
      console.error("DB Save Error:", err);
      res.status(500).json({ message: "Error saving document info to DB" });
    }
  });


module.exports = router;
