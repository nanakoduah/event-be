const { promisify } = require('util');
const AppError = require('../../errors/AppError');
const catchAsync = require('../../errors/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../users/UserModel');

exports.protect = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token = null;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthorised access', 401));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decode.id);

  if (!user) {
    return next(new AppError('Unauthorised access', 401));
  }

  req.currentUser = user;

  next();
});
