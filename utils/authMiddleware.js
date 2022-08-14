const authMiddleware = (req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    res.status(401).send({ message: 'User is not authorized' });
  }
};

module.exports = authMiddleware;