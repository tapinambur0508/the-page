const router = require('express').Router();
const { article, auth, home, live, news } = require('./site/index');

router.use('/article', article);
router.use('/auth', auth);
router.use('/', home);
router.use('/live', live);
router.use('/news', news);

module.exports = router;