const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const CEO = mongoose.model("CEO");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      CEO.findById(jwt_payload.id)
        .then(ceo => {
          if (ceo) {
            return done(null, ceo);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
