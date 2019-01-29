import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  if (req) res.json({ test: " delete route works!" });
});

export default router;
