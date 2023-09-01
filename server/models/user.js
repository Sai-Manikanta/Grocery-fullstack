const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
      },
      description: {
        type: String,
        required: [true, 'Description required'],
      },
      status: {
        type: String,
        enum: ['created', 'assigned', 'reopened', 'completed'],
        default: 'created'
      },
      startDate: {
        type: Date,
        required: [true, 'Start date is required, please enter.'],
      },
      endDate: {
        type: Date,
        required: [true, 'End date is required, please enter.'],
      }
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
