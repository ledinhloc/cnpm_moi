// syncProducts.js
const Product = require('./Product');
const client = require('../config/elastic');

async function indexProduct(product) {
  await client.index({
    index: 'products',
    id: product._id.toString(),
    body: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: {
        _id: product.category._id.toString(),
        name: product.category.name,
        description: product.category.description,
        createdAt: product.category.createdAt,
        updatedAt: product.category.updatedAt
      },
      stock: product.stock,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
    }
  });
}

// index tất cả sản phẩm
async function indexAllProducts() {
  const products = await Product.find().populate('category');
  for (const product of products) {
    await indexProduct(product);
  }
  console.log('All products indexed!');
}

module.exports = { indexProduct, indexAllProducts };
