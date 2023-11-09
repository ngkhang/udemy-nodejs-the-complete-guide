const express = require('express');

const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // Using templating engines for Dynamic Contents
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  })
});

module.exports = router;
