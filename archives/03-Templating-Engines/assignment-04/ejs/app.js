const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const addUserRouter = require('./routes/addUser');

const app = express();
const PORT = 3000;
const MESS = `Server is runing: http://localhost:${PORT}`;

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(addUserRouter);
app.use(userRouter.getAllUser);
app.use(userRouter.addUser);

app.use((request, response, next) => {
  response
    .status(404)
    .render('404', { pageTitle: 'Page Error' })
})

app.listen(PORT, () => console.log(MESS));
