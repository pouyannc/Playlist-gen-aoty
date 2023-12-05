const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const trackListRouter = require('./controllers/trackList');
const loginRouter = require('./controllers/login');
const playlistRouter = require('./controllers/playlist');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/', express.static('../client/dist'));

app.use('/api/tracklist', trackListRouter);
app.use('/api/login', loginRouter);
app.use('/api/playlist', playlistRouter);

module.exports = app;
