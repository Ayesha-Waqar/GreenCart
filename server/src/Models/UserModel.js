const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false,
  },
);
 const user = mongoose.model.user || mongoose.model('user' , userSchema)

 module.exports = user
