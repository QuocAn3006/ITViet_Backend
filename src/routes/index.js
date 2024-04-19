const UserRouter = require('./user');
const ProductRouter = require('./product');
const OrderRouter = require('./order');

const routes = app => {
	app.use('/api/user', UserRouter);
	app.use('/api/product', ProductRouter);
	app.use('/api/order', OrderRouter);
};

module.exports = routes;
