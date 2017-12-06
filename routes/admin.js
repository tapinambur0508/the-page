const router = require('express').Router();
const { article, live, news } = require('./admin/index');

router.use('/article', article);
router.use('/', news);
router.use('/live', live);

module.exports = router;