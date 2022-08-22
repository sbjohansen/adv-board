const mongoose = require('mongoose');
const User = require('../models/user.model');

const advertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  pubDate: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Advert', advertSchema);
