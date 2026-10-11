import { getS3Client } from "../config/config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import path from "path";
import "dotenv/config";

export const uploadFileToS3 = async (file: Express.Multer.File) => {
  if (!file) {
    throw new Error("No file provided");
  }
  const extension = path.extname(file.originalname);
  const fileName = `assets/${crypto.randomUUID()}${extension}`;

  const s3Client = getS3Client();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3Client.send(new PutObjectCommand(params));
  return {
    url: `http://localhost:4566/${process.env.BUCKET_NAME}/${fileName}`,
  };
};
