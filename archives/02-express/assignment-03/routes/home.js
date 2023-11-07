const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../utils/path');

router.get('/', (request, response, next) => {
  console.log('Middleware: Home Page');
  response.sendFile(path.join(rootDir, 'views', 'HomePage.html'));
})

module.exports = router;
