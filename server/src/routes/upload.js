import express from "express";
import multer from "multer";
import User from "../models/User";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./userFiles");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
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
          console.log(document);
          res.json({ message: "file uploaded successfully" });
        }
      }
    );
  } else {
    res.json({ message: "something went wrong :(" });
  }
});

export default router;
