const router = require('express').Router();
const passport = require('passport');

const passportService = require('./passport');
const AuthenticationController = require('../controllers/authentication_controller');

// import { Router } from 'express';

// const router = new Router();

const requireAuth = passport.authenticate('jwt', { session: false });

function protectedRoute(req, res, next) {
  res.send('Here\'s the secret!');
}

router.route('/protected')
  .get(requireAuth, protectedRoute);

router.route('/signup')
  .post(AuthenticationController.signup);

module.exports = router;

// export default router;
