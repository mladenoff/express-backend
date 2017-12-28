const User = require('../models/user');

exports.signup = function signup(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide a username or password' });
  }
};
