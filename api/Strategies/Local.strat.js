const passport = require('passport');
const passportStrategy = require('passport-local');
const User = require('../db/Models/Users');
const bcryptjs = require('bcryptjs');

passport.use(
  new passportStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        if (username && password) {
          const user = await User.findOne({ email: username });
          if (user) {
            if (bcryptjs.compareSync(JSON.stringify(password), user.password)) {
              // Password is correct
              done(null, user);
            } else {
              done('Incorrect email or password');
            }
          } else {
            done('Incorrect email or password');
          }
        } else {
          done('Invalid email or password');
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }
  )
);
    