const express = require('express');
const {
  getAll,
  getOne,
  onCreate,
  onUpdate,
  onDelete,
} = require('./categoriesController');

const router = express.Router();

router.route('/').get(getAll).post(onCreate);

router.route('/:id').get(getOne).patch(onUpdate).delete(onDelete);

module.exports = router;
