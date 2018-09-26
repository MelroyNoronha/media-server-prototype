import express from "express";
import User from "../models/User";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs'

dotenv.config();
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body.email, bcrypt.hashSync(req.body.password, 10))
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.json({ message: 'user not found' })
    } else if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      res.json({ message: 'found ' + user.email + ' logged in successfully.' })
    } else {
      res.status(400).json({ error: { message: 'something went wrong.' } })
    }
  })
});

export default router;
