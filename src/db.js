const mongoose = require('mongoose');

const { DATABASE_URL, DATABASE_PASSWORD, DB_NAME } = process.env;
const uri = DATABASE_URL.replace('<PASSWORD>', DATABASE_PASSWORD);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

module.exports = mongoose;
