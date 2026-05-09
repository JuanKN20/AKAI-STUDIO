const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/products', productsController.getPublicProducts);
router.get('/products/:slug', productsController.getPublicProductBySlug);

router.get('/admin/products', adminAuth, productsController.getAdminProducts);
router.post('/admin/products', adminAuth, productsController.createProduct);
router.put('/admin/products/:id', adminAuth, productsController.updateProduct);
router.delete('/admin/products/:id', adminAuth, productsController.deleteProduct);

module.exports = router;