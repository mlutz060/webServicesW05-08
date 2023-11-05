const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const validation = require('../validation/validate')


router.get('/', validation.requiresAuth, productsController.getAllProducts);
router.get('/:id', validation.validateId, validation.requiresAuth, productsController.getsingleProduct);
router.post('/', validation.validateProduct, validation.requiresAuth, productsController.PostNewProduct);
router.put('/:id', validation.validateProduct, validation.requiresAuth, productsController.UpdateProduct);
router.delete('/:id', validation.validateId, validation.requiresAuth, productsController.DeleteProduct);
//validate the id 

module.exports = router;