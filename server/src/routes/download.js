import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.headers);
  res.json({ message: "received get request :)" });
});

export default router;
