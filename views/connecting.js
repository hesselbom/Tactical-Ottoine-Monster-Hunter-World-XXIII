const align = require('align-text');
const format = require('../format');
const views = require('../views');

module.exports = {
  sockets: {
    'data': function(data) {
      global.messages = data.messages;
      views.set('welcome');
    }
  },

  write: function(cursor) {
    var url = global.protocol + '://' + global.host + ':' + global.port;
    var text = align('Connecting to '+url+'...', format.centerAlign);

    cursor.write( format.verticallyCenter(text) ).hide();
  }
};
