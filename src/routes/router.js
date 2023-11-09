// config variables
const config = require('../config/config');

// express initialization
const express = require("express");
const app = express();


// required libraries
require('dotenv').config();
// const helmet = require('helmet')
// app.use(helmet())


app.use(express.static(config.root));

app.use('/', require('./main.js'))
app.use('/login', require('./login.js'))
app.use('/url', require('./url.js'))
console.log(process.env.APP_PORT)

app.listen(process.env.APP_PORT, () => console.log('Server is running...'))