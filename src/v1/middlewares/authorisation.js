const { promisify } = require('util');
const AppError = require('../../errors/AppError');
const catchAsync = require('../../errors/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.currentUser) {
    return next(new AppError('Unauthorised access', 401));
  }

  next();
});
