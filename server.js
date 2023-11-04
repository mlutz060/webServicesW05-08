const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./databse/connect');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const { auth } = require('express-openid-connect');

const config = {
    authRequired: true,
    auth0Logout: true,
    secret: 'a long randomly generated string',
    baseURL: 'http://localhost:3000',
    clientID: 'ywqun9amWHaOppOu0LSgVhL1sJEL2cKt',
    issuerBaseURL: 'https://dev-6n76wk0p5lv4zlp1.us.auth0.com',

}

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json())
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
app.use('/', require('./routes/index'))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(auth(config));

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else{
        app.listen(port);
        console.log(`Connected listening on ${port}`);
    }
});