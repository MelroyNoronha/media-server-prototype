import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, error => {
      if (error) {
        res.json({ error: error });
      } else {
        res.json({ tokenVerified: true });
      }
    });
  }
});

export default router;
