const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const validation = require('../validation/validate')

router.get('/', usersController.getAllProducts);
router.get('/:id', validation.validateId, productsController.getsingleProduct)

router.post('/', validation.validationRule, productsController.PostNewProduct);

router.put('/:id', validation.validationRule, productsController.UpdateProduct);

router.delete('/:id', validation.validateId, productsController.DeleteProduct);
//validate the id 

module.exports = router;