const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/users', require('./users/user.controller'));
app.use('/api/room', require('./room/room.controller'));
app.use('/api/message', require('./message/message.controller'));

module.exports = app;