const AppError = require('./AppError');

const handleDBCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDBValidationError = (err) => {
  const message = `Invalid input data`;

  const errors = Object.entries(err.errors).reduce((acc, [key, value]) => {
    acc[key] =
      value.name === 'CastError'
        ? `Invalid input for field ${key} `
        : value.message;
    return acc;
  }, {});

  return new AppError(message, 422, { errors });
};

const handleDBUniqueError = (err) => {
  const errors = Object.entries(err.keyValue).reduce((acc, [key, value]) => {
    acc[key] = `${key} must be a unique field`;

    return acc;
  }, {});

  const message = 'Fields must be unique.';
  return new AppError(message, 400, errors);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = { ...err };

  if (
    (err.name === 'ReferenceError' || err.name === 'TypeError') &&
    process.env.NODE_ENV === 'development'
  ) {
    console.log(err);
  }

  if (err.name === 'CastError') {
    error = handleDBCastError(error);
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message || 'Something went wrong',
    });
  }

  if (err.name === 'ValidationError') {
    error = handleDBValidationError(error);
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error: error.error,
      isValidationError: true,
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      message: 'Unathorised access',
    });
  }

  if (err.code === 11000) {
    error = handleDBUniqueError(error);
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error: error.error,
      isValidationError: true,
    });
  }

  return res.status(error.statusCode).json({
    status: error.status,
    message: err.message || 'Something went wrong',
    error: error,
  });
};
