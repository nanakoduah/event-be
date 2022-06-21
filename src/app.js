const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const globalErrorHandle = require('./errors/errorController');
const AppError = require('./errors/AppError');
const authRoutes = require('./v1/auth/authRoutes');
const eventRoutes = require('./v1/events/eventRoutes');
const categoryRoutes = require('./v1/categories/categoryRoutes');
const userRoutes = require('./v1/users/userRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find requested resource, ${req.originalUrl}`, 404));
});

app.use(globalErrorHandle);

module.exports = app;
