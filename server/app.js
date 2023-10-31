const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

module.exports = app;