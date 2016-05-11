const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');

module.exports = local = {
  name: '',

  events: {
    [codes.ENTER]: function() {
      if (local.name.length > 0) {
        views.set('game', {
          name: local.name,
          pos: { x: 100, y: 50 }
        });
      }
    },

    '*': function(key, value) {
      if (value === codes.BACKSPACE) {
        local.name = local.name.substr(0, local.name.length - 1);
      }
      else if (format.isLetter(value)) {
        local.name += value;
      }

      views.rewrite(local);
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
