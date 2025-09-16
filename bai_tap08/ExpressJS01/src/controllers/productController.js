// controllers/productController.js
const productService = require('../services/productService');

async function addProduct(req, res){
  try {
    const {name, description, price, category, imageUrl, stock} = req.body;

    if(!name || !description || !price || !category){
      return res.stats(400).json({ message: 'Thieu du lieu bat buoc'})
    }
    const product = await productService.createProduct({
      name,
      description,
      price,
      category,
      imageUrl,
      stock
    })

    return res.status(201).json({success: true, product})
  } catch (err) {
    console.error(error);
    return res.status(500).json({success: false, message: error.message})
  }
}

async function toggleFavorite(req, res){
  try {
    const userId = req.user && req.user.id;
    if(!userId) return res.status(401).json({message: 'Unauthorized'});

    const productId = req.params.id;
    const result = await productService.toggleFavorite(userId, productId);
    return res.json({success: true, ...result});
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({success: false, message: error.message})
  }
}

async function getFavorites(req, res){
  try {
    const userId = req.user && req.user.id;
    if(!userId) return res.status(401).json({message: 'Unauthorized'});

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const data = await productService.getFavorites(userId, page, limit);
    return res.json({success: true, ...data});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function addView(req, res){
  try {
    const productId = req.params.id;
    const userId = req.user && req.user.id || null;
    const sessionId = req.body.sessionId || null;
    await productService.addView({userId, sessionId, productId});
    return res.json({success: true});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getViewed(req, res){
  try {
    const userId = req.user && req.user.id;
    if(!userId) return res.status(401).json({message: "Unauthorized"});
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const data = await productService.getViewed(userId, page, limit);
    return res.json({success: true, ...data});
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, message: err.message});
  }
}

async function getSimilar(req, res){
  try {
    const productId = req.params.id;
    const limit = parseInt(req.query.limit) ||8;
    const items = await productService.getSimilarProducts(productId, limit);
    return res.json({success: true, products: items});
  } catch (err) {
    console.error(err);
    return res.status(500).json({success: false, message: err.message});
  }
}

async function getStats(req, res){
  try {
    const productId = req.params.id;
    const stats = await productService.getProductStats(productId);
    return res.json({success: true, stats});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getListCategories(req, res) {
  try{
    const categories = await productService.getListCategories();
    res.json({ categories });
  }catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Search failed' });
  }
}

async function searchProducts(req, res) {
  try {
    const { query, category, minPrice, maxPrice, sortBy, page, limit } = req.query;
    const result = await productService.searchProducts({
      query,
      category,
      minPrice,
      maxPrice,
      sortBy,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Search failed' });
  }
}

module.exports = { 
  searchProducts,
  getListCategories,
  toggleFavorite,
  getFavorites,
  addView,
  getViewed,
  getSimilar,
  getStats,
  addProduct
 };
