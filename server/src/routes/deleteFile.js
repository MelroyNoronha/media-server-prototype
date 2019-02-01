import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User";
import Grid from "gridfs-stream";
import dotenv from "dotenv";

dotenv.config();

let gfs;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("userFiles");
});

const router = express.Router();

router.post("/", (req, res) => {
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, err => {
    if (err) {
      console.error(err);
    } else {
      // remove file from grid store
      gfs.remove({ _id: req.headers._id, root: "userFiles" }, err => {
        err
          ? console.error(err)
          : res.json({ message: "file deleted from gridfs" });
      });

      //remove file from user record
      User.update(
        { email: req.headers.user },
        { $pull: { files: { fileId: req.headers._id } } },
        {safe: true},
        (err, doc) => {
          err ? console.error(err) : console.log(doc);
        }
      );
    }
  });
});

export default router;
