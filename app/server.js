const app = require('./index');
const config = require('./config');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raed:raed@cluster0.slfnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });
server.listen(3000);
