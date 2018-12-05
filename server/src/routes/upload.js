import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "./userFiles" });

router.post("/", upload.single("uploaded-file"), (req, res) => {
  console.log(req.body, req.file);
  if (req.file) {
    res.json({ message: "fetch complete" });
  } else {
    res.json({ message: ":(" });
  }
});

export default router;
