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
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // 👇 An association is defined between Product and User models in app.js 
  // the instances of those models gain special methods to interact with their associated counterparts
  req.user
    .createProduct({
      title,
      imageUrl,
      price,
      description,
    })
    .then(() => {
      console.log('Created product');
      res.redirect('/admin/products');
    })
    .catch(error => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) return res.redirect('/');

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    })
    .catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // Solution 1: Using update()
  const options = {
    where: { id: prodId }
  }
  const updateProduct = {
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    description: updatedDesc,
    price: updatedPrice,
  }
  Product.update(updateProduct, options)
    .then(() => {
      console.log('Updated Product');
      res.redirect('/admin/products');
    })
    .catch(error => console.log(error));

  // // Solution 2: Using findByPk() and assign new value
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     product.title = updatedTitle;
  //     product.imageUrl = updatedImageUrl;
  //     product.description = updatedDesc;
  //     product.price = updatedPrice;
  //     return product.save();  // save it to back DB, If the product doesn't exist yet, it will create a new product 
  //   })
  //   .then(() =>{
  //     console.log('Updated Product');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(error => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // // Solution 1: Using destroy() and applying WHERE clauses
  // Product.destroy({ where: { id: prodId } })
  //   .then(() => {
  //     console.log('Deleted Product');
  //     res.redirect('/admin/products');
  //   })
  //   .catch(error => console.log(error));

  // Solution 2: Using findByPk() and destroy()
  Product.findByPk(prodId)
    .then((product) => product.destroy())
    .then(() => {
      console.log('Deleted Product');
      res.redirect('/admin/products');
    })
    .catch(error => console.log(error));

};
