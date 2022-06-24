const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      value: undefined,
      message: 'Password and confirm password mismatch',
    },
  },
  subscriptions: {
    type: Array,
    default: [],
  },
  userRole: {
    type: String,
    enum: ['USER::ADMIN', 'USER::CLIENT'],
    default: 'USER::CLIENT',
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

userSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
