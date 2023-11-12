const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.set('view engine', 'ejs'); //👈Add engine extension
// 👇Default name: "views" A directory or an array of directories for the application's views
app.set('views', 'views');

// Default request doesn't try parse the incoming request body
app.use(bodyParser.urlencoded({ extended: false }));
// Serving Files Statically
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(PORT, () => { console.log(`Server is running: http://localhost:${PORT}`) })
