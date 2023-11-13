const express = require('express');
const router = express.Router();
const users = [];

router.get('/users', (request, response, next) => {
  const config = {
    pageTitle: 'Add new user',
    users,
    hasUsers: users.length > 0,
  }
  response.render('users', config);
});

router.post('/add-user', (request, response, next) => {
  users.push({ userName: request.body.userName });
  response.redirect('/users');
})

module.exports.getUser = router;
module.exports.addUser = router;