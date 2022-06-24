const AppError = require('../../errors/AppError');

exports.protect = async (req, res, next) => {
  if (!req.currentUser) {
    return next(new AppError('Unauthorised access', 401));
  }

  if (Date.now() >= req.currentUser.exp) {
    return next(
      new AppError('User token has expired. Please signin again', 401)
    );
  }

  next();
};

exports.restrictTo =
  (...userRoles) =>
  async (req, res, next) => {
    const { currentUser } = req;

    if (!userRoles.includes(currentUser.userRole)) {
      return next(
        new AppError(
          'You do not have permission to perform this operation',
          403
        )
      );
    }

    next();
  };
