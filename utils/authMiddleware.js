const authMiddleware = (req, res, next) => {
  if (req.session) {
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;