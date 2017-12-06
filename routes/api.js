const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const yahooStocks = require('yahoo-stocks');
const formidable = require('formidable');

router.post('/stock', (req, res, next) => {
  yahooStocks.lookup('AAPL')
    .then(response => res.send(response))
    .catch(err => res.end());
});

router.post('/photo/:folder', (req, res, next) => {
  const form = new formidable.IncomingForm();
  const folder = req.params.folder;

  form.multiples = true;
  form.uploadDir = path.join(__dirname, `../public/images/${folder}`);

  form.on('file', (field, file) => {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  form.on('error', () => {
    return next();
  });

  form.on('end', () => {
    return res.end();
  });
  
  form.parse(req);
});

module.exports = router;
