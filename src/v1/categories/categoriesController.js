const Category = require('./CategoryModel');
const QueryHelper = require('../../utils/QueryHelper');
const catchAsync = require('../../errors/catchAsync');
const AppError = require('../../errors/AppError');
const factory = require('../../utils/factory');

exports.getAll = catchAsync(async function (req, res) {
  const queryHelper = new QueryHelper(Category.find(), req.query).filter();

  const response = await queryHelper.query;

  res.status(201).json({
    status: 'success',
    results: response.length,
    data: { categories: response },
  });
});

exports.getOne = catchAsync(async function (req, res, next) {
  const { id } = req.params;
  const response = await Category.findById(id);

  if (!response) {
    return next(new AppError('Category does not exist', 404));
  }

  res.status(201).json({
    status: 'success',
    results: 1,
    data: {
      category: response,
    },
  });
});

exports.onCreate = factory.create(Category, { modelName: 'category' });
exports.onUpdate = factory.update(Category, { modelName: 'category' });
exports.onDelete = exports.onDelete = factory.delete(Category, {
  modelName: 'category',
});
