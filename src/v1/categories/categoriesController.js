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

exports.onCreate = catchAsync(async function (req, res) {
  const { body } = req;

  const response = await Category.create({ ...body });

  res.status(201).json({
    status: 'success',
    data: {
      category: response,
    },
    results: 1,
  });
});

exports.onUpdate = catchAsync(async function (req, res, next) {
  const { params, body } = req;
  const response = await Category.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!response) {
    return next(new AppError('Category does not exist', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      category: response,
    },
    results: 1,
  });
});

exports.onDelete = catchAsync(async function (req, res, next) {
  const { id } = req.params;
  const response = await Category.findByIdAndDelete(id);

  if (!response) {
    return next(new AppError('Category does not exist', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      category: response,
    },
    results: 1,
  });
});
