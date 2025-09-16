// services/productService.js
const client = require('../config/elastic');
const Category = require('../models/Category');

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

module.exports = { searchProducts, getListCategories };
