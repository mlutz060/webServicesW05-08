const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validation = require('../validation/validate')

router.get('/', validation.requiresAuth, usersController.getAllUsers);
router.get('/:id', validation.requiresAuth, validation.validateId, usersController.getsingleUser);
router.post('/', validation.requiresAuth, validation.validateUser, usersController.PostNewUser);
router.put('/:id', validation.requiresAuth, validation.validateUser, usersController.UpdateUser);
router.delete('/:id', validation.requiresAuth, validation.validateId, usersController.DeleteUser);

module.exports = router; 