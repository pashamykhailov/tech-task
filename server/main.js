'use strict';

require('dotenv').config();

var bodyParser = require('body-parser');
const express = require('express');
const server = express();
const cors = require('cors');

const questions = require('./questions.js');

const PORT = process.env.PORT || 8000;

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use(cors(corsOptions));

server.use(bodyParser.json());

server.use('/questions', questions);

server.listen(PORT);

console.log(`Listen on port ${PORT}`);

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    // ConnectionPool.close()
    global.pool
      .close()
      .then(() => {
        process.exit(0);
      })
      .catch((err) => {
        console.log('error occurs ', err);
        process.exit(0);
      });
  });
});
