#! /usr/bin/env node

const views = require('./views');
const ansi = require('ansi');
const cursor = ansi(process.stdout);

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

process.stdin.on('data', function(key) {
  if (key === '\u0003') {
    cursor.show();
    cursor.reset();
    process.exit();
  }
  else {
    views.call(key);
  }
});

views.set('welcome');
