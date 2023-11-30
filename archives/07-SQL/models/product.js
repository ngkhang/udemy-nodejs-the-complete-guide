const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const sql = "INSERT INTO products (title, price, description, imageUrl) VALUES (?,?,?,?);";
    const values = [this.title, this.price, this.description, this.imageUrl];
    return db.execute(sql, values);
  }

  static update(id, title, price, description, imageUrl) {
    const sql = `
      UPDATE products
      SET
        title = "${title}",
        price = ${price},
        description = "${description}",
        imageUrl = "${imageUrl}"
      WHERE id=${id};
    `;
    return db.execute(sql);
  }

  static deleteById(id) {
    const sql = `DELETE FROM products WHERE id=${id};`;
    db.execute(sql);
  }

  static fetchAll() {
    const sql = `SELECT * FROM products`;
    return db.execute(sql);
  }

  static findById(id) {
    const sql = `SELECT * FROM products WHERE products.id = ?`;
    return db.execute(sql, [id]);
  }
};
