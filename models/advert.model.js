const mongoose = require('mongoose');
const User = require('../models/user.model');

const advertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pubDate: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: false,
  },
});
advertSchema.index({'$**': 'text'});

module.exports = mongoose.model('Advert', advertSchema);
