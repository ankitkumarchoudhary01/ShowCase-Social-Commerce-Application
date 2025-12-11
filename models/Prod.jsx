const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Prod', productSchema,'products');
