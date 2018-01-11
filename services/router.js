import express from 'express';
import passport from 'passport';

import passportService from './passport';
import * as AuthenticationController from '../controllers/authentication_controller';

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

function protectedRoute(req, res, next) {
  res.send('Here\'s the secret!');
}

// Routes

router.route('/protected')
  .get(requireAuth, protectedRoute);

router.route('/signin')
  .post([requireLogin, AuthenticationController.signin]);

router.route('/signup')
  .post(AuthenticationController.signup);

export default router;
