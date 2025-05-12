
require("dotenv").config();

const AWS = require("aws-sdk");

const r2 = new AWS.S3({
    endpoint: process.env.R2_ENDPOINT,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    region: "auto",
    signatureVersion: "v4",
});

module.exports = r2;
