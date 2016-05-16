const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');
const classes = require('../classes');

module.exports = chooseclass = {

    sockets: {
      'created': function(user) {
          global.user = user;
          views.set('game');
      }
    },

    events: {
      '*': function(key, value) {
        if (format.isLetter(value)) {
          for (var key in classes) {
            if (classes[key].char === value.toUpperCase()) {
              global.socket.emit('class set', { class: classes[key].name });
            }
          }
        }
      }
    },

    write: function(cursor) {
        this.chooseClass(cursor);
    },

    chooseClass: function(cursor) {
      var text = align('Choose a class:\n', format.centerAlign) +
      '\n\n\n' +
      align('[F]ighter', format.centerAlign) + '\n' +
      align('[S]orcerer', format.centerAlign) + '\n' +
      align('[R]anger', format.centerAlignWithOffset(-1)) + '\n' +
      align('[P]aladin', format.centerAlign);

      cursor.write( format.verticallyCenter(text) ).hide();
    }

}