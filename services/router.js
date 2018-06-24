import express from 'express';
import passport from 'passport';

import passportService from './passport'; // This just invokes the stuff in ./passport; consider refactoring?

import * as AuthenticationController from '../controllers/AuthenticationController';
import * as WeighInsController from '../controllers/WeighInsController';

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Auth Routes

router.route('/signin')
  .post([requireLogin, AuthenticationController.signin]);

router.route('/signup')
  .post(AuthenticationController.signup);

// WeighIn Routes

router.route('/weigh_ins')
  .get(WeighInsController.index)
  .post(requireAuth, WeighInsController.create);
// .post(requireAuth, WeighInsController.create)

router.route('/users/:userId/weigh_ins')
  .post(requireAuth, WeighInsController.create)
  .get(requireAuth, WeighInsController.index);

// router.route('/users/:userId/weigh_ins')
//   .post(requireAuth, WeighInsController.create)
//   .get(requireAuth, WeighInsController.index);

// Extra (test?) Routes

function protectedRoute(req, res, next) {
  res.send('Here\'s the secret!');
}

router.route('/protected')
  .get(requireAuth, protectedRoute);

export default router;
