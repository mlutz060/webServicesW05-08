const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getsingleUser)

router.post('/', usersController.PostNewUser);



module.exports = router;