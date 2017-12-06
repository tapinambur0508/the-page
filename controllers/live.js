const Live = require('../models/live.js');

module.exports.createLive = (live, callback) => {
  Live.createLive(new Live(live), callback);
}

module.exports.getLive = Live.getLive;
module.exports.getLiveById = Live.getLiveById;
module.exports.addPost = Live.addPost;
module.exports.addComment = Live.addComment;
module.exports.updateLive = Live.updateLive;
module.exports.onlineLive = Live.onlineLive;
module.exports.deleteLive = Live.deleteLive;
