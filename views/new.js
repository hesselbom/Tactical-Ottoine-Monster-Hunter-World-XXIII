const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');

module.exports = newview = {
  name: '',

  events: {
    [codes.ENTER]: function() {
      if (newview.name.length > 0) {
        global.user = {
          name: newview.name,
          pos: { x: 100, y: 50 }
        };
        global.socket.emit('new char', { name: global.user.name });
        views.set('game');
      }
      return false;
    },

    '*': function(key, value) {
      if (value === codes.BACKSPACE) {
        newview.name = newview.name.substr(0, newview.name.length - 1);
      }
      else if (format.isLetter(value)) {
        newview.name += value;
      }

      views.rewrite(newview);
    }
  },

  write: function(cursor) {
    this.enterName(cursor);
  },

  enterName: function(cursor) {
    var text = align('Enter character name:\n' + this.name, format.centerAlign);
    cursor.write( format.verticallyCenter(text) );
  }
};
