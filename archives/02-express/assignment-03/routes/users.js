const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../utils/path');

router.get('/users', (request, response, next) => {
  console.log('Middleware: Users Page');
  response.sendFile(path.join(rootDir, 'views', 'UsersPage.html'));
})

module.exports = router;