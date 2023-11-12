const Product = require('../models/product')

// GET_ADD_PRODUCT
module.exports.getAddProduct = (req, res, next) => {
  const config = {
    pageTitle: 'Add Product',
    activeShop: false,
    productStyle: true,
    activeProduct: true,
    formStyle: true,
    path: '/admin/add-product'
  }
  res.render('add-product', config)
};

// POST_ADD_PRODUCT
module.exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save()
  res.redirect('/');
};

// GET_ADD_PRODUCT
module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
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
};