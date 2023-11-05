const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validation = require('../validation/validate')

router.get('/', validation.requiresAuth, usersController.getAllUsers);
router.get('/:id', validation.validateId, validation.requiresAuth, usersController.getsingleUser);
router.post('/', validation.validateUser, validation.requiresAuth, usersController.PostNewUser);
router.put('/:id', validation.validateUser, validation.requiresAuth, usersController.UpdateUser);
router.delete('/:id', validation.validateId, validation.requiresAuth, usersController.DeleteUser);

module.exports = router; 