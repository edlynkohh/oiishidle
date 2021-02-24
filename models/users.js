const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, require: true },
  messages: [String]
});

const User = mongoose.model("user", userSchema);

module.exports = User;