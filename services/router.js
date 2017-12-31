const router = require('express').Router();
const passport = require('passport');

const passportService = require('./passport');
const AuthenticationController = require('../controllers/authentication_controller');
// Why can't I write this in ES6????

// import express from 'express';
// import passport from 'passport';

// import passportService from './passport';
// import * as AuthenticationController from '../controllers/authentication_controller';

// const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

function protectedRoute(req, res, next) {
  res.send('Here\'s the secret!');
}

// Routes

router.route('/protected')
  .get(requireAuth, protectedRoute);

router.route('/signin')
  .post(AuthenticationController.signup);

router.route('/signup')
  .post(AuthenticationController.signup);

module.exports = router;

// export default router;
// likewise here
