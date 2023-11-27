const Product = require('../models/product')

// GET_PRODUCTS
module.exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    const config = {
      prods: products,
      pageTitle: 'Welcome to Shop',
      path: '/',
    }
    res.render('shop/index', config);
  });
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    const config = {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    }
    res.render('shop/product-list', config);
  });
};

module.exports.getOrders = (req, res, next) => {
  const config = {
    pageTitle: 'Your Orders',
    path: '/orders',
  };
  res.render('shop/orders', config);
};

module.exports.getCart = (req, res, next) => {
  const config = {
    pageTitle: 'Your Cart',
    path: '/cart',
  };
  res.render('shop/cart', config);
};

module.exports.getCheckout = (req, res, next) => {
  const config = {
    pageTitle: 'Checkout',
    path: '/checkout',
  }
  res.render('shop/checkout', config);
};

