import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  files: [{
    filename: String,
    required: false
  }]
});

userSchema.methods.comparePasswordHash = password =>
  bcrypt.compareSync(password, this.passwordHash);

export default mongoose.model("User", userSchema);
