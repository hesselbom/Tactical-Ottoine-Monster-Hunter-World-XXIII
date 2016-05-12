#! /usr/bin/env node

const views = require('./views');
const format = require('./format');
const ansi = require('ansi');
const cursor = ansi(process.stdout);
const io = require('socket.io-client');
const low = require('lowdb');
const storage = require('lowdb/file-sync');

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

global.__base = __dirname + '/';

global.config = low('config.json', { storage });
global.socket = io(global.config.object.protocol + '://' + global.config.object.host + ':' + global.config.object.port);

process.stdin.on('data', function(key) {
  if (key === '\u0003') {
    format.clear();
    cursor.show();
    cursor.reset();
    process.exit();
  }
  else {
    views.call(key);
  }
});

views.set('connecting');
