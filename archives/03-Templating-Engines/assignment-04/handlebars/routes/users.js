const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  const config = {
    pageTitle: 'Add new user',
  }
  response.render('add-user', config);
});

module.exports = router;