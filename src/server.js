const dotenv = require('dotenv').config({});
require('./db');

process.on('unhandledRejection', (err) => {
  console.log(`Unhandled ${err.name} ${err.message} reject! Shutting down...`);
});

process.on('uncaughtException', (err) => {
  console.log(
    `Uncaught ${err.name} ${err.message} exception! Shutting down...`
  );
});

const app = require('./app');

const { SERVER_PORT } = process.env;

const PORT = SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
