const format = require('../format');
const ansi = require('ansi');
const cursor = ansi(process.stdout);

module.exports = {
  current: null,
  cursor: cursor,

  set: function(view) {
    this.current = require('./' + view);

    format.clear();
    if (this.current.init) this.current.init.apply(this.current, [].slice.apply(arguments).slice(1));
    this.current.write(cursor);
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
      if (this.current.events[key])
        this.current.events[key](key, value);
      else if (this.current.events['*'])
        this.current.events['*'](key, value);
    }
  }
};
