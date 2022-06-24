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
    trim: true,
  },
  createdBy: {
    type: String,
    required: [true, 'Something went wrong creating category'],
    trim: true,
  },
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
