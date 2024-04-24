const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = newUser => {
	return new Promise(async (resolve, reject) => {
		const { name, email, password, storeType } = newUser;
		try {
			const checkUser = await User.findOne({ email: email });
			if (checkUser !== null) {
				resolve({
					status: 'ERR',
					message: 'the email is already'
				});
			}
			const hashPassword = bcrypt.hashSync(password, 10);
			const createdUser = await User.create({
				name,
				email,
				password: hashPassword,
				storeType
			});
			if (createdUser) {
				resolve({
					status: 'OK',
					message: 'SUCCESS',
					data: createdUser
				});
			}
		} catch (error) {
			reject(error);
		}
	});
};

const login = userLogin => {
	return new Promise(async (resolve, reject) => {
		const { email, password } = userLogin;
		try {
			const user = await User.findOne({ email: email });
			const serect = process.env.ACCESS_TOKEN;
			if (user === null) {
				resolve({ status: 'ERR', message: 'User not found' });
			}

			const comparePass = bcrypt.compareSync(password, user.password);
			if (!comparePass) {
				resolve({
					status: 'ERR',
					message: 'Email or Password is wrong'
				});
			}

			const accessToken = jwt.sign(
				{
					userId: user.id,
					isAdmin: user.isAdmin
				},
				serect,
				{ expiresIn: '1d' }
			);
			const refreshToken = jwt.sign(
				{
					userId: user.id,
					isAdmin: user.isAdmin
				},
				process.env.REFRESH_TOKEN,
				{ expiresIn: '365d' }
			);
			resolve({
				status: 'OK',
				message: 'SUCCESS',
				accessToken,
				refreshToken
			});
		} catch (error) {
			reject(error);
		}
	});
};

const getNewRefreshToken = token => {
	return new Promise((resolve, reject) => {
		try {
			jwt.verify(
				token,
				process.env.REFRESH_TOKEN,
				async (error, user) => {
					if (error) {
						resolve({
							status: 'ERR',
							message:
								'Refresh token was expired, please login again!"'
						});
					} else {
						const newRefreshToken = jwt.sign(
							{
								userId: user.id,
								isAdmin: user.isAdmin
							},
							process.env.REFRESH_TOKEN,
							{ expiresIn: '365d' }
						);
						resolve({
							status: 'OK',
							message: 'SUCCESS',
							accessToken: newRefreshToken
						});
					}
				}
			);
		} catch (error) {
			reject(error);
		}
	});
};

const getDetailUser = id => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findOne({ _id: id });
			if (user === null) {
				resolve({
					status: 'ERR',
					message: 'The user is not defined'
				});
			}
			resolve({
				status: 'OK',
				message: 'SUCESS',
				data: user
			});
		} catch (error) {
			reject(e);
		}
	});
};

module.exports = {
	register,
	login,
	getNewRefreshToken,
	getDetailUser
};
