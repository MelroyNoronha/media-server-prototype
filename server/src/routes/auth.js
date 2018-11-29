import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  if (!req.body.email) {
    res.json({ error: "Email empty." });
  }
  if (!req.body.password) {
    res.json({ error: "Password empty." });
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.json({ error: "User not found or wrong email." });
    } else if (
      user &&
      bcrypt.compareSync(req.body.password, user.passwordHash)
    ) {
      let token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
        expiresIn: 3600
      });
      res.json({ message: `login successfull!`, token: token });
    } else {
      res.json({ error: "wrong password!" });
    }
  });
});

export default router;
