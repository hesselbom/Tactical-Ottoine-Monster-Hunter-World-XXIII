var ansi = require('ansi');
var codes = require('./codes');
var cursor = ansi(process.stdout);

module.exports = {
  isLetter: function(c) {
    return c.toUpperCase() !== c.toLowerCase();
  },

  clear: function() {
    cursor.write('\033c');
  },

  centerAlignWithOffset: function(offset) {
    var f = this.centerAlign;
    return function(len, longest, line, lines) {
      return f(len - offset, longest, line, lines);
    };
  },

  centerAlign: function(len, longest, line, lines) {
    return Math.floor((process.stdout.columns - len) / 2);
  },

  verticallyCenter: function(text) {
    var lines = text.split('\n');
    return this.verticallyCenterRows(lines.length) + text;
  },

  verticallyCenterRows: function(lines) {
    var out = '';
    var emptyRows = Math.floor(process.stdout.rows / 2 - lines / 2);
    for (var i = 0; i < emptyRows; i++) out += '\n';
    return out;
  },

  toUnicode: function(s) {
    var unicodeString = '';
    for (var i=0; i < s.length; i++) {
      var u = s.charCodeAt(i).toString(16).toUpperCase();
      while (u.length < 4) {
        u = '0' + u;
      }
      u = '\\u' + u;
      unicodeString += u;
    }
    return unicodeString;
  }
};
