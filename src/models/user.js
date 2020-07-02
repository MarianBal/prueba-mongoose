const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: 'is required',
    minlength: [3, 'is too short'],
    maxlength: [20, 'is too long'],
  },
  lastName: {
    type: String,
    required: 'is required',
    minlength: [3, 'is too short'],
    maxlength: [20, 'is too long'],
  },
  email: String,
  skills: [{ type: String }],
});

module.exports = mongoose.model('user', userSchema);
