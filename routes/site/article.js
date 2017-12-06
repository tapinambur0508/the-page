const date = require('date-and-time');
const router = require('express').Router();
const authPolicies = require('../../policies/isAuthenticated');
const articleController = require('../../controllers/article');

router.use((req, res, next) => {
    global.articleId;
    next();
});

router.get('/:id', (req, res, next) => {
    articleId = req.params.id;

    articleController.getArticleById(articleId, (err, article) => {
        if (err) {
           return next();
        }

        res.render('site/article', {
            title: `${article.title} - The Page`,
            styles: ['article'],
            scripts: ['article'],
            article
        });
    });
});

router.post('/comment/add', authPolicies, (req, res, next) => {
    req.checkBody('text', 'Text is required').notEmpty();

    const errors = req.validationErrors();
    
    if (errors) {
        return console.error(errors);
    } else {
        const comment = {
            username: user.username,
            text: req.body.text,
            userThumbnail: user.thumbnail,
            date: date.format(new Date(), 'YYYY/MM/DD HH:mm')
        }
    
        articleController.addComment(articleId, comment, err => {
            if (err) {
                return next();
            }

            res.end();
        });
    }
});

module.exports = router;