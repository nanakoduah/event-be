const express = require('express');
const { protect } = require('../middlewares/authorisation');

const {
  getAll,
  getOne,
  onCreate,
  onUpdate,
  onDelete,
} = require('./eventsController');

const router = express.Router();

router.route('/').get(getAll).post(protect, onCreate);

router.use(protect);
router.route('/:id').get(getOne).patch(onUpdate).delete(onDelete);

module.exports = router;
