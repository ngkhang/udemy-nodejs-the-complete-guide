const express = require('express');
const path = require('path');

const homeRoute = require('./routes/home');
const usersRoute = require('./routes/users');

const PORT = 3000;
const app = express();

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use(homeRoute);
app.use(usersRoute);

// Listen connect
app.listen(PORT, () => console.log(`Server is running: http://localhost:${PORT}`));
