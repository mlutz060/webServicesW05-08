const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./databse/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use((res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else{
        app.listen(port);
        console.log(`Connected listening on ${port}`);
    }
});