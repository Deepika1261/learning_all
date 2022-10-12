const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env['CLIENT_ID'],
        clientSecret: process.env['CLIENT_SECRET'],
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));

//http://localhost:3000/google/
//http://localhost:3000/google/callback
//http://localhost:3000/success
//http://localhost:3000/failed