import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    message: `fetch success. You sent ${req.body.username} and ${
      req.body.password
    }`
  });
});

export default router;
