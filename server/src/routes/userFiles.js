import express from "express";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
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
          let userFileIds = [];
          user.files.forEach(file => {
            userFileIds.push(file.fileId);
          });
          return userFileIds;
        })
        .then(userFileIds => {
          let getUserFile = function(fileId) {
            gfs.findOne({ _id: "5c2f707c2e41b137125c301e" }, (err, file) => {
              if (err) console.error(err);
              if (file)
                return new Promise((reject, resolve) => {
                  resolve(file);
                });
            });
          };

          let userFiles = [];
          getUserFile(file.fileId).then(userFile => userFiles.push(userFile));

          console.log(userFiles);
          return userFiles;
        })
        .then(userFiles =>
          res.json({ message: "These are your files", userFiles: userFiles })
        );
    }
  });
});

export default router;
