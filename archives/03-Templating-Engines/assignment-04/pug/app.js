const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const addUserRouter = require('./routes/add-user');

const app = express();
const PORT = 3000;
const MESS = `Server is runing: http://localhost:${PORT}`;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRouter);
app.use(addUserRouter.getUser);
app.use(addUserRouter.addUser);

app.use('/', (request, response, next) => {
  response
    .status(404)
    .render('404', { pageTitle: 'Page Error' });
})

app.listen(PORT, () => console.log(MESS));