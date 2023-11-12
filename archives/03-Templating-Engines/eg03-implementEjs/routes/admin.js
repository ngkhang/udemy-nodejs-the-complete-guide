const express = require('express');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  const config = {
    pageTitle: 'Add Product',
    activeShop: false,
    productStyle: true,
    activeProduct: true,
    formStyle: true,
    path: '/admin/add-product'
  }
  res.render('add-product', config)
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title })
  console.log(req.body);
  res.redirect('/');
});

exports.router = router;
exports.products = products;
