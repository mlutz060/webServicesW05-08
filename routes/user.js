const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../validation/validate')

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getsingleUser)

router.post('/', validation.saveUser, usersController.PostNewUser);

router.put('/:id', validation.saveUser, usersController.UpdateUser);

router.delete('/:id', usersController.DeleteUser);
//validate the id 

module.exports = router;