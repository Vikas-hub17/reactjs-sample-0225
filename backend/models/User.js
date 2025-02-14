const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  profilePic: String, // URL from picsum.photos
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
