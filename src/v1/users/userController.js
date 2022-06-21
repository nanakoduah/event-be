const { promisify } = require('util');

const User = require('./UserModel');
const catchAsync = require('../../errors/catchAsync');
const AppError = require('../../errors/AppError');

exports.onUpdate = catchAsync(async function (req, res, next) {
  const { subscriptions } = req.body;
  const { _id } = req.currentUser;

  const user = await User.findById(_id);

  if (!user) {
    return next(new AppError('User with this id not found', 400));
  }

  user.subscriptions = subscriptions;
  user.save(console.log);

  res.status(201).json({
    status: 'success',
    results: 1,
    data: { user },
    message: 'Subscriptions updated successfully',
  });
});
