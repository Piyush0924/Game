const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  followers: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  isOnline: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
