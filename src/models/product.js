const mongoose = require('mongoose');
// name, image, brand, price, category, countInStock, description
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},

		image: {
			type: String,
			required: true
		},

		brand: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		category: {
			type: String
		},
		storeType: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
