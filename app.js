const express = require('express');
const app = express();
const authRoute = require('./routes/auth');

app.use('/auth',authRoute);

module.exports = app;