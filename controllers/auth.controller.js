const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { login, password, email, avatar } = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res.status(409).send({ message: 'User with this login already exists' });
      }

      const user = new User({
        login,
        password: await bcrypt.hash(password, 10),
        email,
        avatar,
      });
      await user.save();
      res.status(201).json({ message: 'User created ' + user.login });
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).send({ message: 'Login or password is incorrect' });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(400).send({ message: 'Login or password is incorrect' });
        }
        req.session.login = user.login;
        req.session.save();
        res.status(200).json({ message: 'User logged in ' + user.login });
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  if (req.session.login) {
    res.status(200).json({ login: req.session.login });
  } else {
    res.status(401).send({ message: 'User is not authorized' });
  }
};
