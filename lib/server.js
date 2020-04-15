'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const generateSwagger = require('../docs/swagger.js');
const modelRouter = require('./routes/model-routes.js');

const notFound = require('./middleware/404.js');
const properError = require('./middleware/500.js');

const app = express();
const startServer = (port, mongodb) =>  {
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true};
  mongoose.connect(mongodb, options);
  app.listen(port, () => {
    console.log('Server is up and running on port', port);
  });
};

generateSwagger(app);

app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('RUNS FOR ALL!');
  next();
});

//USED IN MODEL-ROUTES
// app.param('model', (req, res, next) => {
//   console.log('MODEL PRESENT');
//   next();
// });

/**
 * This route gives you a standard "Homepage" message
 * @route GET /
 * @group NonAPI
 * @produces text/html
 * @returns {object} 200 - The HTML to show on the homepage
 */
app.get('', (request, response) => {
  response.status(200);
  response.send('<h1>Is this thing on?</h1>');
});

app.use('/api/v1/', modelRouter);

app.use('*', notFound);
app.use(properError);

module.exports = {
  server: app,
  start: startServer,
};

