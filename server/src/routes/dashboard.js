import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  if (req.headers.authorization) {
    res.json({ message: "You sent an auth token" });
  }
});

export default router;
