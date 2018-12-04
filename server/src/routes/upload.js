import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "userFiles/" });

router.post("/", upload.single("file-input"), (req, res) => {
  console.log(req.body);
  res.json({ message: "fetch complete" });
});

export default router;
