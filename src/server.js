'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const v1Routes = require('./routes/v1');
const authRoutes = require('./auth/routes.js');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get('/', (req, res, next) => {
  res.status(200).send('Up on Tray Wk2D3');
});

app.use(authRoutes);
app.use('/api/v1', v1Routes);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
