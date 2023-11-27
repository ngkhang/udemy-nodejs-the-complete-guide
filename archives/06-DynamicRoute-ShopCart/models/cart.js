const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
)


module.exports = class Cart {
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
      // cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (error) => {
        console.log(error);
      })
    })
  }
}