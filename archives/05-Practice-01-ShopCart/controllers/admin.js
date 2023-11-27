const Product = require('../models/product')

// GET_ADD_PRODUCT
module.exports.getAddProduct = (req, res, next) => {
  const config = {
    pageTitle: 'Admin: Add Product',
    path: '/admin/add-product',
    activeShop: false,
    productStyle: true,
    activeProduct: true,
    formStyle: true,
  }
  res.render('admin/add-product', config)
};

// POST_ADD_PRODUCT
module.exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = "https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png";
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    const config = {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    }
    res.render('admin/products', config);
  })
};