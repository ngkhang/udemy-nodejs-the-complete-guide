const express = require('express');

const router = express.Router();

router.get('/', (request, response, next) => {
  response.render('add-user', { pageTitle: 'Add User' });
});

module.exports = router;