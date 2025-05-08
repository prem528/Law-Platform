const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

module.exports = { submitCase };


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
  
  module.exports = { submitCase, getMyCases };
  
