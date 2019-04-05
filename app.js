/*
 * Simple Web Server
 * Copyright (c) 2018 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * App dependencies.
 * @private
 */

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:default');
const auth = require('./middleware/auth');

/**
 * App variables.
 * @private
 */

const app = express();
const port = process.env.PORT || 3000;

/**
 * App middleware functions.
 * @private
 */

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

if (app.get('env') === 'development') {
  app.use(morgan('common'));
  debug('Morgan enabled');
}

app.use(auth);
app.use((req, res, next) => {
  console.log('Logger boiler plate...');
  next();
});

app.set('view engine', 'pug');
app.set('views', './views');

/**
 * App configuration.
 * @private
 */

console.log(`Application Name: ${config.get('name')}`);
console.log(`Environment: ${config.get('environment')}`);

try {
  config.get('admin.password');
} catch (warning) {
  console.log('Warning: Admin password environment variable not set.');
}

try {
  const test = config.get('debugmode');
} catch (warning) {
  console.log('Warning: \'DEBUG\' mode environment variable is not set.');
}

debug('Default debugging enabled');

/*
 * HTTP Routing
 */

app.get('/test', (req, res) => {
  res.send('Hi');
});

app.get('/template', (req, res) => {
  res.render('index', {title: "Simple Web", message: "Welcome!"});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
