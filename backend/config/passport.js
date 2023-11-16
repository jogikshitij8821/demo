// In your passport-setup.js file

const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const axios = require('axios');
const logger = require('../logger');
const config = require('./config');
const User = require('./models/user');

function setUpPassport() {
  // Bearer token strategy for Google OAuth
  passport.use('bearer', new BearerStrategy(async function (token, done) {
    console.log("Bearer",token);
    try {
      logger.info('Bearer token: ' + token);
     
      const googleResponse = await axios.get(config.apiGoogle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = googleResponse.data;
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Unauthorized' });
      }
    } catch (error) {
      logger.error('Error verifying access token:', error);
      return done(error);
    }
  }));
  
  // JWT strategy for your application
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: config.secretKey,
  };
  
  passport.use('jwt', new JwtStrategy(jwtOptions, function (jwt_payload, done) {
    User.findOne({ username: jwt_payload.username }).then((user) => {
      try{
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Unauthorized' });
        }
      }catch (error) {
        logger.error('Error verifying JWT access token:', error);
        return done(error);
      }
      
    });
  }));
  
 }

 module.exports = setUpPassport;
