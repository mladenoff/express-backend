import express from 'express';

const router = express.Router();

function protectedRoute(req, res, next) {
  res.send('Here\'s the secret!');
}

router.route('/protected')
  .get(protectedRoute);

export default router;
