const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  imageUrl: String,
  stock: { type: Number, default: 0 },
   // thống kê nhanh
  views: { type: Number, default: 0 },            // lượt xem tổng
  favoritesCount: { type: Number, default: 0 },   // số lượng đã favourite
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;