const date = require('date-and-time');
const router = require('express').Router();
const articleController = require('../../controllers/article');

router.use((req, res, next) => {
  global.articleId;
  next();
});

router.get('/create', (req, res) => {
  res.render('admin/create-article', {
    title: 'Create article - The Page',
    styles: ['article', 'summernote', 'tagsinput'],
    scripts: ['article', 'summernote', 'tagsinput']
  });
});

router.post('/create', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('summary', 'Summary is required').notEmpty();
  req.checkBody('content', 'Content is required').notEmpty();
  req.checkBody('image', 'Image is required').notEmpty();
  req.checkBody('categories', 'Categories is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return console.error(errors);
  } else {
    const article = {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      image: req.body.image,
      categories: req.body.categories,
      author: req.body.author,
      date: date.format(new Date(), 'YYYY/MM/DD HH:mm')
    }

    articleController.createArticle(article, err => {
      if (err) {
        return next();
      }

      res.end();
    });
  }
});

router.get('/update/:id', (req, res, next) => {  
  liveId = req.params.id;

  articleController.getArticleById(liveId, (err, article) => {
    if (err) { 
      return next();
    }

    res.render('admin/update-article', {
      title: `${article.title} - The Page`,
      styles: ['article', 'summernote', 'tagsinput'],
      scripts: ['article', 'summernote', 'tagsinput'],
      article
    });
  });
});

router.put('/update', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('summary', 'Summary is required').notEmpty();
  req.checkBody('content', 'Content is required').notEmpty();
  req.checkBody('image', 'Image is required').notEmpty();
  req.checkBody('categories', 'Categories is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('date', 'Date is required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return console.error(errors);
  } else {
    const article = {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      image: req.body.image,
      categories: req.body.categories,
      author: req.body.author,
      date: req.body.date
    }

    articleController.updateArticle(liveId, article, err => {
      if (err) {
        return next();
      }

      res.end();
    });
  }
});

router.put('/carousel/:id', (req, res, next) => {
  const id = req.params.id;

  articleController.carouselArticle(id, (err) => {
    if (err) {
      return next();
    }

    res.end();
  });
});

router.put('/publish/:id', (req, res, next) => {
  const id = req.params.id;

  articleController.publishArticle(id, (err) => {
    if (err) {
      return next();
    }

    res.end();
  });
});

router.delete('/delete/:id', (req, res, next) => {
  const id = req.params.id;

  articleController.deleteArticle(id, (err) => {
    if (err) {
      return next();
    }

    res.end();
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  
  articleController.getArticleById(id, (err, article) => {
    if (err) {
      return next();
    }

    res.render('admin/article', {
      title: `${article.title} - The Page`,
      styles: ['article'],
      article
    });
  });
});

module.exports = router;
