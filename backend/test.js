require("dotenv").config();
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.R2_ENDPOINT),
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  region: "auto",
  signatureVersion: "v4",
});

s3.listObjectsV2({ Bucket: process.env.R2_BUCKET_NAME }, (err, data) => {
  if (err) {
    console.error("❌ Connection Error:", err);
  } else {
    console.log("✅ R2 Connected. Files:", data.Contents);
  }
});
