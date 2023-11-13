const express = require('express');

const router = express.Router();
const listUsers = [];

router.get('/users', (request, response, next) => {
  const config = {
    pageTitle: 'Add User',
    users: listUsers,
    hasUsers: listUsers.length > 0,
  }
  response.render('users', config);
});

router.post('/add-user', (request, response, next) => {
  listUsers.push({ userName: request.body.userName });
  response.redirect('/users');
})

module.exports.getUser = router;
module.exports.addUser = router;