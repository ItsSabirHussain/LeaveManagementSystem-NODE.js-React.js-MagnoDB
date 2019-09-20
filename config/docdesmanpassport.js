const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const DocDesMan = mongoose.model("DocDesMan");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      DocDesMan.findById(jwt_payload.id)
        .then(docdesman => {
          if (docdesman) {
            return done(null, docdesman);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
