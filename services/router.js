import express from 'express';
import passport from 'passport';

import passportService from './passport'; // This just invokes the stuff in ./passport; consider refactoring?
import * as AuthenticationController from '../controllers/authentication_controller';

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


// Auth Routes

router.route('/signin')
  .post([requireLogin, AuthenticationController.signin]);

router.route('/signup')
  .post(AuthenticationController.signup);

// Routes

function protectedRoute(req, res, next) {
  res.send('Here\'s the secret!');
}

router.route('/protected')
  .get(requireAuth, protectedRoute);

export default router;
