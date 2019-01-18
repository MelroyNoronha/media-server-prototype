import express from "express";
import bodyParser from "body-parser";
import auth from "./routes/auth";
import register from "./routes/register";
import dashboard from "./routes/dashboard";
import upload from "./routes/upload";
import userFiles from "./routes/userFiles";
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
      console.log(`mongodb connected to ${process.env.DB_NAME} `);
    }
  }
);

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", auth);
app.use("/register", register);
app.use("/dashboard", dashboard);
app.use("/upload", upload);
app.use("/userFiles", userFiles);

// users route only for testing
app.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    res.json({ users });
  });
});

app.listen(8081, _ => console.log("server running on 8083..." + __dirname));
