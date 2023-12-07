const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Storing User in request for using from anywhere in my app
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;  // Storing sequelize object in request and not Js object
      next();
    })
    .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Setup Association
// Relation: Product - User
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});
User.hasMany(Product);

// Relation: User - Cart
User.hasOne(Cart);  // Add key id user in Cart table
Cart.belongsTo(User);

// Relation: Product - Cart
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Relation: Order - User
Order.belongsTo(User)
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, {through: OrderItem}); // or

sequelize
  // .sync({ force: true })  // Overwrite table when server is begin
  .sync()
  .then(() => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User
        .create({
          userName: 'user1',
          email: 'user1@1234'
        })
        .then((user) => {
          user.createCart();
        })
    }
    return Promise.resolve(user); // return user;
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));
