const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = OrderItem;
