const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    trim: true,
  },
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
