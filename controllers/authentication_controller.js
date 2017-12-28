import jwt from 'jwt-simple';

import User from '../models/user';
import config from '../config';

const tokenForUser = function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp,
  }, config.secret);
};

export const signin = function signin(req, res, next) {
  const { user } = req.user;
  res.send({ token: tokenForUser(user), user_id: user._id });
};

export const signup = function signup(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide a username and password' });
  }

  // Check if user already exists, send error if they do
  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) { return res.status(422).send({ error: 'Email taken' }); }
    const user = new User({
      email,
      password,
    });
    user.save((err) => {
      if (err) { return next(err); }
      res.json({ user_id: user._id, token: tokenForUser(user) });
    });
  });
};
