const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const userRouter = require('./routes/users');
const addRouter = require('./routes/add-user');

const app = express();
const PORT = 3000;
const MESS = `Server is runing: http://localhost:${PORT}`;

app.engine('hbs', expressHbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
}))

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter)
app.use(addRouter.getUser)
app.post(addRouter.addUser)

app.use((request, response, next) => {
  response
    .status(404)
    .render('404', { pageTitle: 'Page Not Pound' });
})

app.listen(PORT, () => console.log(MESS));
