const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authUserMiddleWare } = require('../middleware/authMiddleware');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/get-new-token', userController.newRefreshToken);
router.get(
	'/get-detail-user/:id',
	authUserMiddleWare,
	userController.getDetailUser
);

module.exports = router;
