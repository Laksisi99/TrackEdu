const express = require('express');
const bodyParser = require('body-parser');
const endPoints = require('./routes/Routes');
const logger = require('morgan');
const cors = require('cors');

const server = express();
server.use(logger('dev'));
const port = 5000;

server.use(bodyParser.json());

server.use('/trackedu/v1', endPoints);
// server.get('/', (req, res) => {
//     res.send('Welcome to the Trackedu API');
// });

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
