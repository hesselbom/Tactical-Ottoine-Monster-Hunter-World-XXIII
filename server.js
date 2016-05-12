#! /usr/bin/env node

const helpers = require('./helpers');

var port = 1337;
var io = require('socket.io')(port);

var messages = [];

var potentialActions = [
  { type: 'nothing', chance: 100 },
  { type: 'monster', chance: 0 },
  { type: 'item',    chance: 1 }
];

io.on('connection', function(socket) {
  var user = {};

  socket.emit('data', { messages: messages.slice(-5) });

  socket.on('new char', function(data) {
    user.name = data.name;
    user.pos = { x: 100, y: 50 };

    socket.emit('created', user);
  });

  socket.on('move', function(x, y) {
    if (Math.abs(x + y) === 1) {
      user.pos.x += x;
      user.pos.y += y;

      var action = helpers.getBasedOnChance(potentialActions);
      switch(action.type) {
        case 'monster':
        case 'item':
        default:
      }

      socket.emit('moved', { pos: user.pos });
    }
  });

  socket.on('chat', function(data) {
    messages.push({ name: user.name, message: data.message });
    io.emit('chat', messages.slice(-5));
  });

  socket.on('disconnect', function() {
    io.emit('user disconnected');
  });
});

console.log("Server running on port " + port);
