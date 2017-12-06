module.exports = (req, res, next) => {
  req.user && req.user.role === 'admin' ? next() : res.status(404).send('Page no found');
}
