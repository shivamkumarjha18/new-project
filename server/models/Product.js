const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
