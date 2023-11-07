const express = require('express');

const app = express();
const PORT = 3000;

// Assignment 02: Require 2
// app.use((request, response, next) => {
//   console.log('This is middleware 1');
//   next();
// });
// app.use((request, response, next) => {
//   console.log('This is middleware 2');
//   response.send('Assignment 02- Express: Done')
// });

// Assignment 02: Require 3
app.use('/users', (request, response, next) => {
  console.log('This is middleware 2');
  response.send('<h1>The "Users" Page</h1>')
})

app.use('/', (request, response, next) => {
  console.log('This is middleware 1');
  response.send('<h1>The Home Page</h1>')
})

app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`))