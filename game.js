#! /usr/bin/env node

const views = require('./views');
const format = require('./format');
const ansi = require('ansi');
const cursor = ansi(process.stdout);

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

global.__base = __dirname + '/';

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

views.set('welcome');
