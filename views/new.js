const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');

module.exports = that = {
  name: '',

  events: {
    [codes.ENTER]: function() {
      if (that.name.length > 0) {
        views.set('game', {
          name: that.name,
          pos: { x: 100, y: 50 }
        });
      }
    },

    '*': function(key, value) {
      if (value === codes.BACKSPACE) {
        that.name = that.name.substr(0, that.name.length - 1);
      }
      else if (format.isLetter(value)) {
        that.name += value;
      }

      views.rewrite(that);
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
