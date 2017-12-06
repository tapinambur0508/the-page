const router = require('express').Router();
const articleController = require('../../controllers/article');

router.get('/', (req, res, next) => {
  articleController.getArticles((err, articles) => {
    if (err) {
      return next();
    }

    res.render('admin/news', {
      title: 'News - The Page',
      styles: ['news'],
      scripts: ['news'],
      articles
    });
  });  
});

module.exports = router;