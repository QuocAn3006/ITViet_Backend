const UserRouter = require('./user');

const routes = app => {
	app.use('/api/user', UserRouter);
};

module.exports = routes;
