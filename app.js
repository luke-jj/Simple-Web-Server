/*
 * Simple Web Server
 * Luca J
 * MIT LICENSE
 */

'use strict';

/**
 * App dependencies.
 * @private
 */

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('./middleware/auth');

/**
 * App variables.
 * @private
 */

const app = express();
const port = process.env.PORT || 3000;

/*
 * Middleware functions.
 */

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan('common'));

app.use((req, res, next) => {
  console.log('Logger boiler plate...');
  next();
});

app.use(auth);

/*
 * HTTP Routing
 */

app.get('/test', (req, res) => {
  res.send('Hi');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
