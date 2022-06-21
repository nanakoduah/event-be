const AppError = require('../../errors/AppError');
const catchAsync = require('../../errors/catchAsync');
const User = require('../users/UserModel');

exports.signup = catchAsync(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const user = await User.create({
    email,
    name,
    password,
    confirmPassword,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new AppError('Incorrect email or password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  const isValidPassword = await user.isPasswordValid(password, user.password);

  if (!user || !isValidPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  return res.status(201).json({
    status: 'success',
    data: {
      user: {
        email: user.email,
        name: user.name,
      },
    },
  });
});

exports.getMe = catchAsync(async function (req, res, next) {
  const { id } = req.currentUser;
  const response = await User.findById(id);

  if (!response) {
    return next(new AppError('User not found', 404));
  }

  res.status(201).json({
    status: 'success',
    results: 1,
    data: {
      event: response,
    },
  });
});
