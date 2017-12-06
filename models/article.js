const mongoose = require('mongoose');
const CommentSchema = require('./comment');

const ArticleSchema = mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    image: String,
    author: String,
    date: String,
    isCarousel: {
        type: Boolean,
        default: false
    },
    isPublish: {
        type: Boolean,
        default: false
    },
    comments: [CommentSchema],
    categories: {
        type: Array
    }
});

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.createArticle = (article, callback) => {
    article.save(callback);
}

module.exports.showNews = callback => {
    Article.find({ isPublish: true }, callback).sort({ _id: -1 });
}

module.exports.getArticles = callback => {
    Article.find(callback).sort({ _id: -1 });
}

module.exports.getArticlesByCategory = (category, callback) => {
    Article.find({ categories: { $in: [ category ] } }, callback).sort({ _id: -1 });
}

module.exports.getArticleById = (id, callback) => {
    Article.findById(id, callback);
}

module.exports.updateArticle = (id, article, callback) => {
    Article.update({ _id: id }, article, callback);
}

module.exports.getCarouselArticles = callback => {
    Article.find({ isCarousel: true }, { summary: 0, content: 0 }, callback);
}

module.exports.getLatestArticles = callback => {
    Article.find(callback).sort({ _id: -1 }).limit(3);
}

module.exports.addComment = (id, comment, callback) => {
    Article.findById(id, (err, article) => {
        if (err) {
            callback(err);
        }

        article.comments.push(comment);
        article.save(callback);
    });
}

module.exports.carouselArticle = (id, callback) => {
    Article.findById(id, (err, article) => {
        if (err) {
            callback(err);
        }

        article.isCarousel = !article.isCarousel;
        article.save(callback);
    });
}

module.exports.publishArticle = (id, callback) => {
    Article.findById(id, (err, article) => {
        if (err) {
            callback(err);
        }

        article.isPublish = !article.isPublish;
        article.save(callback);
    });
}

module.exports.deleteArticle = (id, callback) => {
    Article.remove({ _id: id }, callback);
}