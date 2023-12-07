const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const { connectDB } = require('./util/database');


const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findById(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));
  next();
});

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

// // Solution 1: By course
// connectDB((client) => {
//   console.log(client);
//   app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`));
// });

// Solution 2: By MongoDB (new version)
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`));
  })
  .catch((error) => console.log(error));
