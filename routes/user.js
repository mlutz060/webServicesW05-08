const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../validation/validate')

router.get('/', usersController.getAllUsers);
router.get('/:id', validation.validateId, usersController.getsingleUser)

router.post('/', validation.validationRule, usersController.PostNewUser);

router.put('/:id', validation.validationRule, usersController.UpdateUser);

router.delete('/:id', validation.validateId, usersController.DeleteUser);
//validate the id 

module.exports = router;