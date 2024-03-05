const User = require('../models/user');
const user = require('../services/user');

module.exports = {
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the input is required'
				});
			}
			const res = await user.login(req.body);
		} catch (error) {
			return res.status(401).json({
				message: error
			});
		}
	}
};
