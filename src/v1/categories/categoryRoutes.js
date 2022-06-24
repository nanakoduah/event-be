const express = require('express');
const { USER_TYPES } = require('../../utils/index.js.JS');
const authenticate = require('../middlewares/authenticate');
const { protect, restrictTo } = require('../middlewares/authorisation');

const {
  getAll,
  getOne,
  onCreate,
  onUpdate,
  onDelete,
} = require('./categoriesController');

const router = express.Router();

router.use(authenticate);

router
  .route('/')
  .get(getAll)
  .post(protect, restrictTo(USER_TYPES.ADMIN), onCreate);

router.use(protect);
router.use(restrictTo(USER_TYPES.ADMIN));

router.route('/:id').get(getOne).patch(onUpdate).delete(onDelete);

module.exports = router;
