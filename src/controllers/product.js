const ProductService = require('../services/product');

module.exports = {
	createProduct: async (req, res) => {
		try {
			const { name, image, brand, price } = req.body;

			if (!name || !image || !brand || !price) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the input is required'
				});
			}
			const response = await ProductService.createProduct(req.body);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},
	getProductList: async (req, res) => {
		try {
			const { limit, page, sort, filter } = req.query;
			const response = await ProductService.getProductList(
				Number(limit) || null,
				Number(page) || 0,
				sort,
				filter
			);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},
	updatedProduct: async (req, res) => {
		try {
			const productId = req.params.id;
			const data = req.body;
			if (!productId) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the productId is required'
				});
			}
			const response = await ProductService.updatedProduct(
				productId,
				data
			);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	}
};
