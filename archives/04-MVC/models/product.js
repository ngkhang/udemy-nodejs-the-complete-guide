const fs = require('fs');
const path = require('path');

const filePath = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(filePath, (error, fileContent) => {
    if (error) return callback([]);
    callback(JSON.parse(fileContent))
  });
}

module.exports = class Product {
  constructor(titleInput) {
    this.title = titleInput;
  }
  save = () => {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(
        filePath,
        JSON.stringify(products),
        (error) => console.log('Write File Error: ', error))
    })
  }

  static fetchAll = (callback) => {
    getProductsFromFile(callback)
  }
}