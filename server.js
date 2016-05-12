#! /usr/bin/env node

const helpers = require('./helpers');
const low = require('lowdb');
const storage = require('lowdb/file-async');

const port = 1337;
const io = require('socket.io')(port);
const db = low('db.json', { storage });

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
    var exists = db('users').find({ name: data.name });

    if (exists) {
      // TODO: Send error
    }
    else {
      user.name = data.name;
      user.pos = { x: 100, y: 50 };

      db('users').push(user);

      socket.emit('created', user);
    }
  });

  socket.on('load char', function(data) {
    user = db('users').find({ name: data.name });

    if (user) {
      socket.emit('loaded', user);
    }
    else {
      // TODO: Send error
    }
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
      db.write();
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
