const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./databse/connect');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

const {} = './validation.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json())
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
app.use('/', require('./routes/index'))
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