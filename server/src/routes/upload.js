import express from "express";
import multer from "multer";
import User from "../models/User";
import dotenv from "dotenv";
import multerGfsStorage from "multer-gridfs-storage";

dotenv.config();
const router = express.Router();

const storage = new multerGfsStorage({
  url: `mongodb://localhost:8082/${process.env.DB_NAME}`,
  file: (req, file) => {
    return {
      filename: file.originalname,
      metadata: file.metadata,
      bucketName: "userFiles"
    };
  }
});
console.log(`mongodb://localhost:8082/${process.env.DB_NAME}`);
const upload = multer({ storage: storage });

router.post("/", upload.single("uploaded-file"), (req, res) => {
  if (req.file) {
    User.updateOne(
      { email: req.body.email },
      { $push: { files: req.file.filename } },
      (err, document) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ message: "file uploaded successfully", file: req.file });
        }
      }
    );
  } else {
    res.json({ message: "something went wrong :(" });
  }
});

export default router;
