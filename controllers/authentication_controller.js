import User from '../models/user';

const signup = function signup(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide a username and password' });
  }

  // Check if user already exists, send error if they do
  User.findOne({email: email}), (err, existingUser) => {
    if (err) { return next(err)}
    if (existingUser)
  }
};
