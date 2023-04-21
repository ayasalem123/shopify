const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    unique:true,
  },
  category: String,
  price: {
    type: Number,
  },
  countinstock: Number,
  rating: Number,
  numReviews: String,
  brand: String,
  image: { type: String, required: [true, 'product image is requried'] },
  description: String,
});
module.exports = mongoose.model('product', productSchema);
