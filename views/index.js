const format = require('../format');
const ansi = require('ansi');
const cursor = ansi(process.stdout);
const io = require('socket.io-client');

module.exports = {
  current: null,
  cursor: cursor,

  set: function(view) {
    var that = this;

    if (this.current !== null) this.unset();
    this.current = require(global.__base + 'views/' + view);
    this.current.__id = view;

    format.clear();
    if (this.current.init) this.current.init.apply(this.current, [].slice.apply(arguments).slice(1));
    this.current.write(cursor);

    // Setup socket listeners
    if (this.current.sockets) {
      for (var key in this.current.sockets) {
        if (this.current.sockets.hasOwnProperty(key)) {
          (function(key) {
            global.socket.on(key, (data) => {
              that.current.sockets[key](data);
            });
          }(key));
        }
      }
    }
  },

  unset: function() {
    // Unset socket listeners
    if (this.current !== null && this.current.sockets) {
      for (var key in this.current.sockets) {
        if (this.current.sockets.hasOwnProperty(key)) {
          global.socket.off(key);
        }
      }
    }
  },

  rewrite: function(view) {
    cursor.buffer();
    format.clear();
    view.write(cursor);
    cursor.flush();
  },

  call: function(value) {
    var key = value.toUpperCase();

    if (this.current !== null && this.current.events) {
      var returnVal = true,
        currentId = this.current.__id;

      if (this.current.events[key])
        returnVal = this.current.events[key](key, value);

      if (this.current.events['*'] && returnVal !== false && currentId === this.current.__id)
        this.current.events['*'](key, value);
    }
  }
};
