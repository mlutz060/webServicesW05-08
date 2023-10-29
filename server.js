const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./databse/connect');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const session = require('express-session');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require("passport-google-oauth20").Strategy;


const port = process.env.PORT || 3000;
const app = express();

app.use(session({
        secret: process.env.PASSPORT_LONG_SECRET,
        resave: false,
        saveUninitialized: false
    }))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
// Google Startegy
passport.use(new GoogleStrategy({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
},
    function(accessToken, refreshToken, profile, cb){
        User.findOrCreate(
            {
                googleId: profile.id
            },
            function(err, user){
                return cb(err, user);
            }
        );
    }
));
app.get("/auth/google",
passport.authenticate("google", { scope: ["profile"] })
);
app.use('/', require('./routes'))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else{
        app.listen(port);
        console.log(`Connected listening on ${port}`);
    }
});