const AppError = require('../../errors/AppError');
const catchAsync = require('../../errors/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.currentUser) {
    return next(new AppError('Unauthorised access', 401));
  }

  if (Date.now() <= req.currentUser.exp * 1000) {
    return next(
      new AppError('User token has expired. Please signin again', 401)
    );
  }

  next();
});
