class AppError extends Error {
  constructor(message, statusCode, error) {
    super(message);

    this.status = statusCode < 500 ? 'fail' : 'error';
    this.statusCode = statusCode;
    this.error = error;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
