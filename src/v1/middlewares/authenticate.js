const { promisify } = require('util');
const catchAsync = require('../../errors/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../users/UserModel');

module.exports = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token = null;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET, {
    ignoreExpiration: true,
  });

  const user = await User.findById(decode.id);

  if (!user) {
    return next();
  }

  user.exp = decode.exp;
  req.currentUser = user;

  next();
});
