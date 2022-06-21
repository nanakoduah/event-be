const express = require('express');
const { onUpdate } = require('./userController');
const { protect } = require('../middlewares/authorisation');

const router = express.Router();

router.use(protect);
router.route('/subscriptions').patch(onUpdate);

module.exports = router;
