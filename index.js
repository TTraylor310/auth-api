'use strict';

require('dotenv').config();
const { db } = require('./src/models');
const server = require('./src/server.js');

db.sync()
  .then(() => {
    server.start(process.env.PORT || 3009);
  })
  .catch((e) => console.error('on the index page', e));
