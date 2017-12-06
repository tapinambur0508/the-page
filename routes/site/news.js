const router = require('express').Router();
const articleController = require('../../controllers/article.js');

const categories = {
    'iphone': {
        header: 'iPhone',
        description: 'A widescreen iPod with touch controls; a revolutionary mobile phone; and a breakthrough Internet communications device'
    },
    'ipad': {
        header: 'iPad',
        description: 'So capable, you won’t want to put it down'
    },
    'mac': {
        header: 'Mac',
        description: 'There’s nothing else like a Mac'
    }
}

router.get('/', (req, res, next) => {
    articleController.showNews((err, articles) => {
        if (err) {
            return next();
        }

        res.render('site/news', {
            title: 'News - The Page',
            styles: ['news'],
            header: 'News',
            description: '',
            articles
        });
    });
});

router.get('/:category', (req, res, next) => {
    const category = req.params.category;
    
    if (category in categories) {
        const { header, description } = categories[category];

        articleController.getArticlesByCategory(category, (err, articles) => {
            if (err) {
                return next();
            }

            res.render('site/news', {
                title: `${header} - The Page`,
                styles: ['news'],
                header,
                description,
                articles
            });
        });
    } else {
        return next();
    }
});

module.exports = router;
