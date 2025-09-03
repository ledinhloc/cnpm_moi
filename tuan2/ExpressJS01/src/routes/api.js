const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const Product = require('../models/Product');
const Category = require('../models/Category');

const routerAPI = express.Router();

routerAPI.use(auth);

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

//product
// Lấy sản phẩm theo danh mục với phân trang
routerAPI.get('/products/:categoryId', auth, async (req, res) => {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const products = await Product.find({ category: categoryId })
      .skip(skip)
      .limit(limit)
      .populate('category', 'name');

    const totalProducts = await Product.countDocuments({ category: categoryId });

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = routerAPI; 
