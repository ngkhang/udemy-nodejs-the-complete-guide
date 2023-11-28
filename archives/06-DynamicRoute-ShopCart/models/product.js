const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex((item) => item.id === this.id);
        const updateProducts = [...products];
        updateProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updateProducts), (error) => {
          console.log(error);
        });
      }
      else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  };

  static deleteById(id) {
    getProductsFromFile((prods) => {
      const removedProduct = prods.find((item) => item.id === id);
      const updateProducts = prods.filter((item) => item.id !== id);
      fs.writeFile(p, JSON.stringify(updateProducts), (error) => {
        if (error) {
          console.log(error);
          return;
        }
        Cart.delProduct(id, removedProduct.price)
      });
    });
  };

  static fetchAll(cb) {
    getProductsFromFile(cb);
  };

  static findById(id, cb) {
    getProductsFromFile((prods) => {
      const product = prods.find((item) => item.id === id);
      cb(product);
    });
  }
};
