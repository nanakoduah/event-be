const AppError = require('../../errors/AppError');
const catchAsync = require('../../errors/catchAsync');
const User = require('../users/UserModel');
const jwt = require('jsonwebtoken');
const ms = require('ms');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!email || !name || !password || !confirmPassword) {
    return next(new AppError('All fields are required', 400));
  }

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

  if (!user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const isValidPassword = await user.isPasswordValid(password, user.password);

  if (!isValidPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

  const token = jwt.sign(
    { id: user._id, iat: Date.now(), sub: user.email },
    JWT_SECRET,
    {
      expiresIn: ms(JWT_EXPIRES_IN),
    }
  );

  return res.status(201).json({
    status: 'success',
    data: {
      user: {
        email,
        name: user.name,
        subscriptions: user.subscriptions,
        role: user.userRole,
      },
      token,
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
