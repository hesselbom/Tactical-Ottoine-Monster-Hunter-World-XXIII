const align = require('align-text');
const format = require('../format');
const views = require('../views');

module.exports = {
  sockets: {
    'connect': function() {
      views.set('welcome');
    }
  },

  write: function(cursor) {
    var url = global.protocol + '://' + global.host + ':' + global.port;
    var text = align('Connecting to '+url+'...', format.centerAlign);

    cursor.write( format.verticallyCenter(text) ).hide();
  }
};
