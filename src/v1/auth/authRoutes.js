const express = require('express');
const { signup, login, getMe } = require('./authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);
router.get('/me', login);

module.exports = router;
