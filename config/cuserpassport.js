const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const CUser = mongoose.model("CUser");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      CUser.findById(jwt_payload.id)
        .then(cuser => {
          if (cuser) {
            return done(null, cuser);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
