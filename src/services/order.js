const Order = require('../models/order');

const createOrder = newOrder => {
	return new Promise(async (resolve, reject) => {
		const { orderItems, itemPrice, discountPrice, totalPrice } = newOrder;

		try {
			const createOrder = await Order.create({
				orderItems,
				itemPrice,
				discountPrice,
				totalPrice
			});
			if (createOrder) {
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: createOrder
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};

const getAllOrder = search => {
	return new Promise(async (resolve, reject) => {
		try {
			let allOrder = [];
			if (search) {
				allOrder = await Order.find({
					_id: { $regex: search, $options: 'i' }
				});
			} else {
				allOrder = await Order.find();
			}
			resolve({
				status: 'OK',
				message: 'success',
				data: allOrder
			});
		} catch (e) {
			reject(e);
		}
	});
};

const findOrderById = search => {
	return new Promise(async (resolve, reject) => {
		try {
			const allOrder = await Order.find({
				_id: { $regex: search, $options: 'i' }
			});
			resolve({
				status: 'OK',
				message: 'success',
				data: allOrder
			});
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = {
	createOrder,
	getAllOrder,
	findOrderById
};
