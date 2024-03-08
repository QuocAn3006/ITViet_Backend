const UserService = require('../services/user');

module.exports = {
	register: async (req, res) => {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the input is required'
				});
			}
			const response = await UserService.register(req.body);
			return res.status(200).json(response);
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	login: async (req, res) => {
		try {
			// const { email, password } = req.body;
			// if (!email || !password) {
			// 	return res.status(200).json({
			// 		status: 'ERR',
			// 		message: 'the input is required'
			// 	});
			// }
			const response = await UserService.login(req.body);
			const { refreshToken, ...newResponse } = response;
			res.cookie('refresh_token', refreshToken, {
				httpOnly: true,
				secure: false,
				sameSite: 'strict',
				path: '/'
			});
			return res.status(200).json({ ...newResponse, refreshToken });
		} catch (error) {
			return res.status(404).json({
				message: error
			});
		}
	},

	newRefreshToken: async (req, res) => {
		try {
			const token = req.cookie.refresh_token;
			if (!token) {
				return res.status(200).json({
					status: 'ERR',
					message: 'the token is required'
				});
			} else {
				const response = await UserService.getNewRefreshToken(token);
				return res.status(200).json(response);
			}
		} catch (error) {
			return res.status(404).json({ message: error });
		}
	}
};
