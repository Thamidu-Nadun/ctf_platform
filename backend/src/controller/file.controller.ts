import { Router } from "express";
import * as fileService from "../service/file.service";
import { upload } from "../middleware/upload.middleware";

const router: Router = Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.file;
    const fileId = await fileService.uploadFileToS3(file);
    return res
      .status(200)
      .json({ message: "File uploaded successfully", data: fileId });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Error uploading file" });
  }
});

export default router;
