const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');

router.post('/create-order', OrderController.createOrder);