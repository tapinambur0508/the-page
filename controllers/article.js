const Article = require('../models/article.js');

module.exports.createArticle = (article, callback) => {
    Article.createArticle(new Article(article), callback);
}

module.exports.showNews = Article.showNews;
module.exports.getArticles = Article.getArticles;
module.exports.getArticlesByCategory = Article.getArticlesByCategory;
module.exports.getArticleById = Article.getArticleById;
module.exports.updateArticle = Article.updateArticle;

module.exports.getCarouselArticles = () => {
    return new Promise((resolve, reject) => {
        Article.getCarouselArticles((err, articles) => {
            if (err) {
                reject(err);
            }

            resolve(articles);
        });
    });
}

module.exports.getLatestArticles = () => {
    return new Promise((resolve, reject) => {
        Article.getLatestArticles((err, articles) => {
            if (err) {
                reject(err);
            }

            resolve(articles);
        });
    });
}

module.exports.addComment = Article.addComment;
module.exports.carouselArticle = Article.carouselArticle;
module.exports.publishArticle = Article.publishArticle;
module.exports.deleteArticle = Article.deleteArticle;