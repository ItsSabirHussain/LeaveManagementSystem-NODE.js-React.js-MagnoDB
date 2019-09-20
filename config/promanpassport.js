const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const ProMan = mongoose.model("ProMan");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      ProMan.findById(jwt_payload.id)
        .then(proman => {
          if (proman) {
            return done(null, proman);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
