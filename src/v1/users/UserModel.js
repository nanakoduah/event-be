const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm password is required'],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      value: undefined,
      message: 'Password and confirm password mismatch',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.isPasswordValid = async function (
  loginPassword,
  userPassword
) {
  const result = await bcrypt.compare(loginPassword, userPassword);
  return result;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
