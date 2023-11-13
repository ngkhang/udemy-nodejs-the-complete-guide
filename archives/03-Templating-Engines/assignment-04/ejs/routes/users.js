const express = require('express');

const router = express.Router();

const listUsers = [];

router.get('/users', (request, response, next) => {
  const config = {
    pageTitle: 'List Users',
    users: listUsers,
  }
  response.render('users', config);
});

router.post('/add-user', (request, response, next) => {
  listUsers.push({ 'userName': request.body.userName })
  // response.redirect('/');
  response.redirect('/users');
})

module.exports.getAllUser = router;
module.exports.addUser = router;