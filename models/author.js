const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: String,
  age: String,
});

module.exports = mongoose.model('Author', authorSchema); 