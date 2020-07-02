const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillSchema = new Schema({
  skill: [String],
});

module.exports = mongoose.model('skill', skillSchema);
