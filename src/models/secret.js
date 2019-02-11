// External Dependancies
const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
  id: String,
  value: String, // Encrypted JSON
});

module.exports = mongoose.model('Secret', secretSchema);
