const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
	{
		orderItems: [
			{
				name: { type: String, required: true },
				amount: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true }
				// product: {
				// 	type: mongoose.Schema.Types.ObjectId,
				// 	ref: 'Product',
				// 	required: true
				// }
			}
		],
		itemPrice: { type: Number, required: true },
		discountPrice: { type: Number, required: true },
		totalPrice: { type: Number, required: true }
	},
	{
		timestamps: true
	}
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
