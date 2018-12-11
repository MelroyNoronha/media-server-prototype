import express from "express";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./userFiles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/", upload.single("uploaded-file"), (req, res) => {
  console.log(req.body, req.file, req.file.filename);
  if (req.file) {
    res.json({ message: "fetch complete" });
  } else {
    res.json({ message: ":(" });
  }
});

export default router;
