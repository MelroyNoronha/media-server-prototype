import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.json({ error: "user not found" });
    } else if (
      user &&
      bcrypt.compareSync(req.body.password, user.passwordHash)
    ) {
      let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: 3600
      });
      res.json({ message: `login successfull!` });
    } else {
      res.json({ error: "wrong password!" });
    }
  });
});

export default router;
