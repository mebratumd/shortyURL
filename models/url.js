const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortyURL = new Schema({
  originalURL: String,
  newURL: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('URL',shortyURL);
