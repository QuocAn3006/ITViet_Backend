const OrderService = require('../services/order');

module.exports = {
	createOrder: async (req, res) => {
		try {
			const response = await OrderService.createProduct(req.body);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	}
};