const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const product = new Product(null, title, imageUrl, description, price);

  product.save()
    .then(() => res.redirect('/'))
    .catch((error) => console.log('Error Message: ', error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(([data, inf0Table]) => {
      if (!data[0]) return res.redirect('/');

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: data[0]
      });
    })
    .catch((error) => console.log('Error Message: ', error));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.update(prodId, updatedTitle, updatedPrice, updatedDesc, updatedImageUrl)
    .then(() => res.redirect('/admin/products'))
    .catch((error) => console.log('Error Message: ', error));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([data, infoTable]) => {
      res.render('admin/products', {
        prods: data,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch((error) => console.log('Error Message: ', error));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
