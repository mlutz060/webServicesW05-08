const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const validation = require('../validation/validate')


router.get('/', validation.requiresAuth, productsController.getAllProducts);
router.get('/:id', validation.requiresAuth,validation.validateId, productsController.getsingleProduct);
router.post('/', validation.requiresAuth,validation.validateProduct, productsController.PostNewProduct);
router.put('/:id', validation.requiresAuth,validation.validateProduct, productsController.UpdateProduct);
router.delete('/:id', validation.requiresAuth,validation.validateId, productsController.DeleteProduct);
//validate the id 

module.exports = router;