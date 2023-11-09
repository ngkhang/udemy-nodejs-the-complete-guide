const express = require('express');

const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  const config = {
    prods: products,
    pageTitle: 'Shop',
    hasProduct: products.length > 0,
    activeShop: true,
    productStyle: true,
    activeProduct: false,
    formStyle: false,
    path: '/'
  }
  res.render('shop', config)
});

module.exports = router;
