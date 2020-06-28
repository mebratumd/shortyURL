const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortyURL = new Schema({
  originalURL: String,
  newURL: String,
  date: {type: Date, default: Date.now},
  counter: {type: Number, default: 0}
});

module.exports = mongoose.model('URL',shortyURL);
