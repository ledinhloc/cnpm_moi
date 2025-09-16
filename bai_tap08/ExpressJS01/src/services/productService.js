// services/productService.js
const client = require('../config/elastic');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');
const Viewed = require('../models/Viewed');
const Order = require('../models/Order');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');


/* create product */
async function createProduct(data){
  try {
    const category = await Category.findById(data.category);
    if(!category){
      throw new Error('Category not found!');
    }

    const product = await Product.create({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      imageUrl: data.imageUrl,
      stock: data.stock || 0,
    })
    return product;
  } catch (err) {
    throw err;
  }
}


/**
 * Thêm/xóa sản phẩm yêu thích cho user
 */
async function toggleFavorite(userId, productId) {
  try {
    const existing = await Favorite.findOne({ user: userId, product: productId });
    if (existing) {
      // remove
      await Favorite.deleteOne({ _id: existing._id });
      // decrement counter atomically
      await Product.findByIdAndUpdate(productId, { $inc: { favoritesCount: -1 } });
      return { action: 'removed' };
    } else {
      await Favorite.create({ user: userId, product: productId });
      await Product.findByIdAndUpdate(productId, { $inc: { favoritesCount: 1 } });
      return { action: 'added' };
    }
  } catch (err) {
    throw err;
  }
}

/* Lay danh sach product yeu thich cua user */
async function getFavorites(userId, page = 1, limit = 20){
  const skip = (page - 1) * limit;
  const favs = await Favorite.find({ user: userId})
    .sort({ createdAt: -1})
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'product',
      populate: { path: 'category'}
    })

  const products = favs.map(f => f.product);
  const total = await Favorite.countDocuments({user : userId});
  return {total, products};
}

/* ghi nhan 1 luot xem */
async function addView({userId = null, sessionId = null, productId}){
  try{
    const product = await Product.findById(productId);
    if(!product){
      throw new Error('Product not found');
    }
    await Viewed.create({user: userId, sessionId, product});
    await Product.findByIdAndUpdate(productId, { $inc: {views : 1}});
    return true;
  }catch(err){
    throw err;
  }
}

async function getViewed(userId, page = 1, limit = 20){
  const skip = (page -1) *limit;
  const logs = await Viewed.find({user: userId})
    .sort({ viewedAt: -1})
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'product',
      populate: {path: 'category'}
    })
  
  //loai trung product 
  const seen = new Set();
  const products = [];
  for(const log of logs){
    const pid = log.product._id.toString();
    if(!seen.has(pid)){
      seen.add(pid);
      products.push(log.product);
    }
  }

  const total = await Viewed.countDocuments({user: userId});
  return {total, products};
}

async function getSimilarProducts(productId, limit = 8){
  const prod = await Product.findById(productId).populate('category');
  if(!prod) return [];
  const basePrice = prod.price || 0;
  const minPrice = basePrice*0.8;
  const maxPrice = basePrice*1.2;

  const similar = await Product.find({
    _id: {$ne: productId},
    category: prod.category._id,
    price: {$gte: minPrice, $lte: maxPrice}
  })
  .limit(limit)
  .sort({createAt: -1});

  return similar;
}

async function getProductStats(productId){
  const product = await Product.findById(productId).select('views favoritesCount');
  const buyers = await Order.aggregate([
    {$match: { "items.product": new mongoose.Types.ObjectId(productId)}},
    {$unwind: "$items"},
    {$match: {"items.product": new mongoose.Types.ObjectId(productId)}},
    {$group: {_id: "$user"}},
    {$count: "buyersCount"}
  ])

  const buyersCount = (buyers[0] && buyers[0].buyersCount) ? buyers[0].buyersCount : 0;

  const commentCount = await Comment.countDocuments({product: productId, deleted: false});

  return {
    views: product ? product.views : 0,
    favoritesCount: product ? product.favoritesCount : 0,
    buyersCount,
    commentCount
  }
}

async function getListCategories() {
  return await Category.find();
}

async function searchProducts({ query, category, minPrice, maxPrice, sortBy, page = 1, limit = 10 }) {
  const must = [];
  const filter = [];

  if (query) {
    must.push({
      multi_match: {
        query,
        fields: ['name^2', 'description'],
        fuzziness: 'AUTO'
      }
    });
  }

  if (category) {
    filter.push({ term: { "category._id": category } });
  }

  if (minPrice || maxPrice) {
    filter.push({
      range: {
        price: {
          gte: minPrice ? parseFloat(minPrice) : 0,
          lte: maxPrice ? parseFloat(maxPrice) : 100000000
        }
      }
    });
  }

  let sort = [];
  if (sortBy === 'price_asc') sort.push({ price: 'asc' });
  else if (sortBy === 'price_desc') sort.push({ price: 'desc' });
  else if (sortBy === 'latest') sort.push({ createdAt: 'desc' });
  else if (sortBy === 'views') sort.push({ views: 'desc' });

  const result = await client.search({
    index: 'products',
    from: (page - 1) * limit,
    size: limit,
    query: {
      bool: {
        must,
        filter
      }
    },
    sort
  });

  const products = result.hits.hits.map(hit => ({ id: hit._id, ...hit._source }));
  return { total: result.hits.total.value, products };
}

module.exports = {
  searchProducts,
  getListCategories,
  toggleFavorite,
  getFavorites,
  addView,
  getViewed,
  getSimilarProducts,
  getProductStats,
  createProduct
   };
