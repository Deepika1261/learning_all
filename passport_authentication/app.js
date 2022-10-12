const express = require('express');
const passport = require('passport');
var session = require('express-session')
require("dotenv").config()
const app = express();
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

require('./passport');

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3000

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success",isLoggedIn, (req, res) => {
    console.log(req.user.email)
    res.send(`Welcome ${req.user.email}`)
})

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);

app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(port, () => console.log(" http://localhost:3000/,server running on port" + port))