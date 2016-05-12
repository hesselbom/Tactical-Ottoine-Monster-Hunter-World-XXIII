#! /usr/bin/env node

var port = 1337;
var io = require('socket.io')(port);

var messages = [];

io.on('connection', function(socket) {
  var user = {};

  socket.emit('data', { messages: messages.slice(-5) });

  socket.on('new char', function(data) {
    user.name = data.name;
  });

  socket.on('chat', function(data) {
    messages.push({ name: user.name, message: data.message });
    io.emit('chat', { messages: messages.slice(-5) });
  });

  socket.on('disconnect', function() {
    io.emit('user disconnected');
  });
});

console.log("Server running on port " + port);
