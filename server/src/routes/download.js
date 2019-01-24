import express from "express";
import jwt from "jsonwebtoken";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let gfs;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("userFiles");
});

const router = express.Router();

router.get("/", (req, res) => {
  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, err => {
    if (err) {
      console.error("err");
    } else {
      gfs.findOne({ _id: req.headers._id }, (err, file) => {
        if (err) {
          console.error(err);
        } else if (file) {
          res.set("Content-Type", file.contentType);
          let readstream = gfs.createReadStream({
            _id: req.headers._id
          });
          readstream.on("error", err => res.end());
          readstream.pipe(res);
        }
      });
    }
  });
});

export default router;
