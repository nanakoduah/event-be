const AppError = require('../errors/AppError');
const catchAsync = require('../errors/catchAsync');
const QueryHelper = require('./QueryHelper');

exports.getAll = (Model, { modelName }) =>
  catchAsync(async function (req, res, next) {
    const { page = 1, limit = 50 } = req.query;
    const queryHelper = new QueryHelper(Model.find(), req.query)
      .filter()
      .sort()
      .pagination();

    const response = await queryHelper.query;

    res.status(201).json({
      status: 'success',
      results: response.length,
      data: { [`${modelName}s`]: response },
      pagination: {
        page,
        limit,
        totalRecords: await Model.countDocuments(),
      },
    });
  });

exports.getOne = (Model, { modelName }) =>
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const response = await Model.findById(id);

    if (!response) {
      return next(new AppError(`${modelName} does not exist`, 404));
    }

    res.status(201).json({
      status: 'success',
      results: 1,
      data: {
        [modelName]: response,
      },
    });
  });

exports.create = (Model, { modelName }) =>
  catchAsync(async function (req, res, next) {
    const { body } = req;

    const response = await Model.create({ ...body });

    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: response,
      },
      results: 1,
    });
  });

exports.update = (Model, { modelName }) =>
  catchAsync(async function (req, res, next) {
    const { params, body } = req;
    const response = await Model.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return next(new AppError(`${modelName} not found`, 404));
    }

    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: response,
      },
      results: 1,
    });
  });

exports.delete = (Model, { modelName }) =>
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const response = await Model.findByIdAndDelete(id);

    if (!response) {
      return next(new AppError(`No ${modelName} not found`, 404));
    }

    res.status(201).json({
      status: 'success',
      data: null,
      results: 1,
    });
  });
