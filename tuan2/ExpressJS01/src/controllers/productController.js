// controllers/productController.js
const productService = require('../services/productService');

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

module.exports = { searchProducts, getListCategories };
