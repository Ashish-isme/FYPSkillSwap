const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  department: {
    type: String,
    enum: ["Sales", "Marketing", "Credit", "HR", "Support"],
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
