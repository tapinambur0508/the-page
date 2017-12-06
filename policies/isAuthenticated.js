module.exports = (req, res, next) => {
  req.user ? next() : res.status(404).send('Page no found');
}