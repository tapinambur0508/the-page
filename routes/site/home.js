const router = require('express').Router();
const articleController = require('../../controllers/article');

router.get('/', (req, res, next) => {
    const carouselArticles = articleController.getCarouselArticles();
    const latestArticles = articleController.getLatestArticles();

    Promise.all([carouselArticles, latestArticles])
    .then(([carouselArticles, latestArticles]) => {
        res.render('site/home', {
            title: 'The Page',
            styles: ['home'],
            carouselArticles,
            latestArticles
        });
    })
    .catch(err => next());
});

module.exports = router;
