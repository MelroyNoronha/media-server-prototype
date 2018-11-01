import express from "express";
import bodyParser from "body-parser";
import auth from "./routes/auth";
import mongoose from "mongoose";
import User from "./models/User";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
mongoose.connect(
  `mongodb://localhost:8082/${process.env.DB_NAME}`,
  { useNewUrlParser: true },
  err => {
    if (err) {
      throw err;
    } else {
      console.log("mongodb connected. ");
    }
  }
);

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", auth);

app.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    res.json({ users });
  });
});

app.listen(8083, _ => console.log("server running ..." + __dirname));
