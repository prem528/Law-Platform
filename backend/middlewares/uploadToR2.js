const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const crypto = require("crypto");

// Use memory storage so the file doesn't save to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const uploadToR2 = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.file;
  const uniqueFileName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${path.extname(file.originalname)}`;

  const params = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // 👈 important for public access
  };

  try {
    await s3.send(new PutObjectCommand(params));
    req.uploadedFileUrl = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${uniqueFileName}`;
    next();
  } catch (err) {
    console.error("Cloudflare R2 upload failed:", err);
    res.status(500).json({ message: "Failed to upload to R2" });
  }
};

module.exports = { upload, uploadToR2 };
