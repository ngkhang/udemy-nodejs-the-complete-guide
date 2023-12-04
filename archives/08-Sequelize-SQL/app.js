const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const PORT = 3000;

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Storing User in request for using from anywhere in my app
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;  // Storing sequelize object in request and not Js object
      next();
    })
    .catch();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Setup Association
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});
User.hasMany(Product);

sequelize
  // .sync({ force: true })  // Overwrite table when server is begin
  .sync()
  .then((result) => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) return User.create({
      userName: 'user1',
      email: 'user1@1234'
    })
    return Promise.resolve(user); // return user;
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));
