const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


//---------------------SubmitCase Controller logic---------------

const submitCase = async (req, res) => {
  const { title, type, description } = req.body;

  try {
    const newCase = await prisma.case.create({
      data: {
        title,
        type,
        description,
        userId: req.user.id, // from JWT
      },
    });

    res.status(201).json({ message: "Case submitted", case: newCase });
  } catch (error) {
    console.error("Error submitting case:", error);
    res.status(500).json({ message: "Failed to submit case" });
  }
};



//----------------GetMyCases Controller logic-----------------

const getMyCases = async (req, res) => {
    try {
      const cases = await prisma.case.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
        include: {
          documents: true,
          lawyer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
  
      res.json(cases);
    } catch (error) {
      console.error("Error fetching user cases:", error);
      res.status(500).json({ message: "Failed to retrieve cases" });
    }
  };
  

  //-----------------View the Single Case-------------------------
  
  const getSingleCase = async (req, res) => {
    const { id } = req.params;
  
    try {
      const userCase = await prisma.case.findUnique({
        where: { id },
        include: {
          documents: true,
          lawyer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
  
      if (!userCase || userCase.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized or case not found" });
      }
  
      res.json(userCase);
    } catch (error) {
      console.error("Error fetching case:", error);
      res.status(500).json({ message: "Failed to fetch case" });
    }
  };
  

// -----------uploadDocuments Controller logic-------------------
const uploadDocument = async (req, res) => {
  try {
    const newDoc = await prisma.document.create({
      data: {
        filename: req.file.originalname,
        fileUrl: req.uploadedFileUrl, // populated by uploadToR2 middleware
        caseId: req.params.caseId,
        uploadedById: req.user.id,
      },
    });

    res.status(201).json({ message: "Document uploaded", document: newDoc });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload document" });
  }
};


  //-------------------View Case Documents----------------------

  const getCaseDocuments = async (req, res) => {
    const { caseId } = req.params;
  
    try {
      const documents = await prisma.document.findMany({
        where: { caseId },
        orderBy: { createdAt: "desc" },
        include: {
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
  
      res.json({ documents });
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  };
  
  //----------------view all case documents-----------------

  const allCaseDocuments =  async (req, res) => {
    try {
      const userId = req.user.id;
      const documents = await prisma.document.findMany({
        where: {
          uploadedById: userId,
        },
        orderBy: { createdAt: "desc" },
      });
      res.json(documents);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  }

  module.exports = {
    submitCase,
    getMyCases,
    getSingleCase,
    uploadDocument,
    getCaseDocuments,
    allCaseDocuments
  };
  