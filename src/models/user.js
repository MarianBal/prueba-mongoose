const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  // cars: [{ type: this.schema.type.ObjectId, ref: 'car' }],
});

module.exports = mongoose.model('user', userSchema);
