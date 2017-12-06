const mongoose = require('mongoose');

const PostSchema = module.exports = mongoose.Schema({
  username: String,
  userThumbnail: String,
  text: String,
  image: String,
  date: String
});