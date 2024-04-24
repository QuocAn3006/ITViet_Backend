const OrderService = require('../services/order');

module.exports = {
	createOrder: async (req, res) => {
		try {
			const response = await OrderService.createOrder(req.body);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},
	getAllOrder: async (req, res) => {
		try {
			const search = req.query.search;
			const userId = req.params.userId;

			const data = await OrderService.getAllOrder(userId, search);

			return res.status(200).json(data);
		} catch (e) {
			return res.status(404).json({
				message: e
			});
		}
	}
};
