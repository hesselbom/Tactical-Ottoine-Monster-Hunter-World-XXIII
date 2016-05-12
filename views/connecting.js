const align = require('align-text');
const format = require('../format');
const views = require('../views');
const io = require('socket.io-client');

// TODO: Fetch from some config
var protocol = 'http';
var host = 'localhost';
var port = 1337;

module.exports = {
  write: function(cursor) {
    var url = protocol + '://' + host + ':' + port;
    var text = align('Connecting to '+url+'...', format.centerAlign);

    cursor.write( format.verticallyCenter(text) ).hide();

    global.socket = io(url);
    socket.on('connect', () => {
      views.set('welcome');
    });
  }
};
