const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');


const config = {
    authRequired: true,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: 'http://localhost:3000',
    clientID: 'ywqun9amWHaOppOu0LSgVhL1sJEL2cKt',
    issuerBaseURL: 'https://dev-6n76wk0p5lv4zlp1.us.auth0.com',

};

router.use(auth(config));

router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});



router.use('/', require('./swagger'))
router.use('/users', require('./user'))
router.use('/products', require('./products'))


module.exports = router;