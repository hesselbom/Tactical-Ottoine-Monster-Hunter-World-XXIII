const align = require('align-text');
const format = require('../format');
const views = require('../views');

module.exports = {
  events: {
    'N': function() {
      views.set('new');
      return false;
    }
  },

  write: function(cursor) {
    var text = align('Welcome to \x1b[1mTactical Ottoine Monster Hunter World XXIII\x1b[22m', format.centerAlignWithOffset(9)) +
      '\n\n\n' +
      align('[N]ew character', format.centerAlign);

    cursor.write( format.verticallyCenter(text) ).hide();
  }
};
