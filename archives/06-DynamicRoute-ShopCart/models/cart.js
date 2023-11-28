const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
)

module.exports = class Cart {

  static getCart(cb) {
    fs.readFile(p, (error, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (error) {
        cb(null);
        return;
      };
      cb(cart);
    })
  };

  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (error, fileContent) => {
      let cart = {
        products: [],   // [{id, qty}]
        totalPrice: 0,
        count: 0
      }
      if (!error) cart = JSON.parse(fileContent);

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex((item) => item.id === id);
      const existingProduct = cart.products[existingProductIndex];

      let updateProduct;
      // Add new product/ inscrease quantity
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      }
      else {
        updateProduct = { id, qty: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart = {
        ...cart,
        totalPrice: cart.totalPrice + +productPrice,
        count: cart.count + 1,
      }
      fs.writeFile(p, JSON.stringify(cart), (error) => console.log(error))
    })
  };

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (error, fileContent) => {
      if (error) return;

      let cart = JSON.parse(fileContent);
      const updateCart = { ...cart };
      const product = updateCart.products.find((item) => item.id === id);

      if (!product) return;

      updateCart.products = updateCart.products.filter((item) => item.id !== id);
      updateCart.totalPrice = updateCart.totalPrice - productPrice * product.qty;
      updateCart.count = updateCart.count - product.qty;

      fs.writeFile(p, JSON.stringify(updateCart), (error) => console.log(error));
    })
  }
}