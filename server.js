#! /usr/bin/env node

var port = 1337;
var io = require('socket.io')(port);

io.on('connection', function (socket) {
});

console.log("Server running on port " + port);
