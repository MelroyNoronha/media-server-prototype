import express from "express";
import path from "path";
import bodyParser from "body-parser";
import auth from "./routes/auth";
import mongoose from "mongoose";
import User from "./models/User";

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

app.use("/login", express.static(__dirname + path.join("/public/")));

app.use("/auth", auth);

//testing code for db
let user1 = new User({
  email: 'user1@email.com',
  passwordHash: '$2a$10$Lk8.Yk3raqotnqjnExOz2OD/kw4CSNTRMc6MDd/rk.aGlAUAOML4.'
})

if (!User.findOne({ email: user1.email })) {
  user1.save(err => {
    if (err) throw err
    console.log('user saved successfully.')
  })
}

app.get('/users', (req, res) => {
  User.find({}, (err, users) => res.json({ users }))
})

app.listen(8081, _ => console.log("server running on 8081..." + __dirname));
