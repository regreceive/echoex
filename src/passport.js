/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import User from './data/models/User';

const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, email, password, done) => {
      User.encryptPassword(password, null).then(encryptedPassword => {
        User.findOne({ where: { email, password: encryptedPassword } }).then(
          user => {
            if (!user) {
              return done(null, false);
            }
            if (user.password !== password) {
              return done(null, false);
            }
            return done(null, user);
          },
        );
      });
    },
  ),
);
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.info('='.repeat(32));
  console.info(id);
  User.findById(id).then(user => {
    cb(null, user);
  });
});

export default passport;
