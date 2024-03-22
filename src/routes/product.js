const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const { authMiddleWare } = require('../middleware/authMiddleware');

router.post('/create-product', ProductController.createProduct);
router.get('/get-all-product', ProductController.getProductList);
router.put(
	'/update-product/:id',
	authMiddleWare,
	ProductController.updatedProduct
);
module.exports = router;
