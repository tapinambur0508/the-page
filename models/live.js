const mongoose = require('mongoose');
const PostSchema = require('./post');
const CommentSchema = require('./comment');

const LiveSchema = mongoose.Schema({
  title: String,
  summary: String,
  image: String,
  isOnline: {
    type: Boolean,
    default: false
  },
  posts: [{
    type: PostSchema,
    required: false
  }],
  comments: [{
    type: CommentSchema, 
    required: false
  }]
});

const Live = module.exports = mongoose.model('Live', LiveSchema);

module.exports.createLive = (live, callback) => {
  live.save(callback);
}

module.exports.getLive = callback => {
  Live.find(callback);
}

module.exports.getLiveById = (id, callback) => {
  Live.findById(id, callback);
}

module.exports.addPost = (id, post, callback) => {
  Live.findById(id, (err, live) => {
    if (err) {
      callback(err);
    }

    live.posts.push(post);
    live.save(callback);
  });
}

module.exports.addComment = (id, comment, callback) => {
  Live.findById(id, (err, live) => {
    if (err) {
      callback(err);
    }

    live.comments.push(comment);
    live.save(callback);
  });
}

module.exports.updateLive = (id, live, callback) => {
  Live.update({ _id: id }, live, callback);
}

module.exports.onlineLive = (id, callback) => {
  Live.findById(id, (err, live) => {
    if (err) {
      callback(err);
    }

    live.isOnline = !live.isOnline;
    live.save(callback);
  });
};

module.exports.deleteLive = (id, callback) => {
  Live.remove({ _id: id }, callback);
}