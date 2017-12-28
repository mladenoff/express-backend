import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import config from '../config';
import User from '../models/user';

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
};

const jwtStrategy = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtStrategy);
