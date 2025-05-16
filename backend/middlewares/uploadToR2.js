const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const crypto = require("crypto");

// Memory storage: keeps file in memory buffer (not saved to disk)
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
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const uniqueFileName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${path.extname(file.originalname)}`;

  const params = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: uniqueFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read", // Ensure public access to the file
  };

  try {
    await s3.send(new PutObjectCommand(params));
    req.uploadedFileUrl = `${process.env.R2_PUBLIC_URL}/${uniqueFileName}`;
    next();
  } catch (err) {
    console.error("Cloudflare R2 upload failed:", err);
    return res.status(500).json({ message: "Failed to upload to R2" });
  }
};

// 👇 Wrapper for optional file uploads (does nothing if no file is present)
const optionalUploadToR2 = async (req, res, next) => {
  if (!req.file) {
    return next(); // continue without error
  }
  return uploadToR2(req, res, next);
};

module.exports = { upload, uploadToR2, optionalUploadToR2 };
