import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";

const router = express.Router();

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user && user.email.toString() === req.body.email.toString()) {
      res.json({ error: `This email has already beeen used` });
    } else {
      if (isEmail(req.body.email)) {
        let passwordHash = bcrypt.hashSync(
          req.body.password.toString(),
          10,
          (err, hash) => {
            if (err) {
              throw err;
            } else {
              return hash;
            }
          }
        );

        let newUser = new User({
          email: req.body.email,
          passwordHash: passwordHash
        });

        newUser.save(err => {
          if (err) {
            throw err;
          } else {
            res.json({
              message: "You have successfully created an account.",
              registered: true
            });
          }
        });
      }
    }
  });
});

export default router;
