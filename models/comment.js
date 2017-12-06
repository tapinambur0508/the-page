const mongoose = require('mongoose');

const CommentSchema = module.exports = mongoose.Schema({
  username: String,
  userThumbnail: String,
  text: String,
  date: String
});