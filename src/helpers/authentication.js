const passport = require('passport');
const authJWT = require('passport-jwt');
require('dotenv').config();

const jwtOptions = {
  secretOrKey: process.env.SECRET_KEY,
  jwtFromRequest: authJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
};

let jwtStrategy = new authJWT.Strategy(
  { ...jwtOptions },
  (jwtPayload, next) => {
    next(null, {
      id: jwtPayload.id
    });
  }
);

passport.use(jwtStrategy);
const auth = passport.authenticate('jwt', { session: false });

module.exports = auth;
