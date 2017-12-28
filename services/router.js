const router = require('express').Router();

const AuthenticationController = require('../controllers/authentication_controller');

// import { Router } from 'express';

// const router = new Router();

function protectedRoute(req, res, next) {
  res.send('Here\'s the secret!');
}

router.route('/protected')
  .get(protectedRoute);

module.exports = router;

// export default router;
