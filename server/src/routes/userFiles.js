import express from "express";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();
const router = express.Router();

let gfs;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("userFiles");
});

router.get("/", (req, res) => {
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, err => {
    if (err) {
      console.error(err);
      res.json({ error: err });
    } else {
      User.findOne({ email: req.headers.user })
        .then(user => {
          let userFileNames = [];
          user.files.forEach(file => userFileNames.push(file.filename));
          return userFileNames;
        })
        .then(userFileNames => {
          gfs.files.find().toArray((err, files) => {
            if (err) console.error(err);

            if (files) {
              let userFiles = files.filter(file => {
                if (userFileNames.includes(file.filename)) {
                  return file;
                }
              });

              userFiles.length === 0
                ? res.json({ message: "You haven't uploaded any files yet" })
                : res.json({
                    message: "Here are your files",
                    files: userFiles
                  });
            }
          });
        });
    }
  });
});

export default router;
