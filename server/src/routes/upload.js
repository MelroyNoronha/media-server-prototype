import express from "express";
import multer from "multer";
import { mongoURI } from "../globalConstants";
import User from "../models/User";
import dotenv from "dotenv";
import multerGfsStorage from "multer-gridfs-storage";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();

const storage = new multerGfsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: `${file.originalname}`,
      bucketName: "userFiles"
    };
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("uploaded-file"), (req, res) => {
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, err => {
    if (err) {
      console.error(err);
    } else {
      if (req.file) {
        User.updateOne(
          { email: req.body.email },
          {
            $push: {
              files: { filename: req.file.filename, fileId: req.file.id }
            }
          },
          (err, document) => {
            if (err) {
              console.log(err);
            } else {
              res.json({
                message: "file uploaded successfully",
                file: req.file
              });
            }
          }
        );
      } else {
        res.json({ message: "something went wrong :(" });
      }
    }
  });
});

export default router;
