const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');
const helpers = require('../helpers');
const userHelper = require('../user');

function move(x, y) {
  global.socket.emit('move', x, y);
};

module.exports = game = {
  sockets: {
    'chat': function(messages) {
      global.messages = messages;
      views.rewrite(game);
    },
    'moved': function(data) {
      global.user.pos = data.pos;
      views.rewrite(game);
    }
  },

  events: {
    [codes.LEFT]:  move.bind(this, -1, 0),
    [codes.RIGHT]: move.bind(this, 1, 0),
    [codes.UP]:    move.bind(this, 0, -1),
    [codes.DOWN]:  move.bind(this, 0, 1),
    'C': function() {
      views.set('entermessage');
    }
  },

  write: function(cursor) {
    cursor.write(userHelper.header());
    cursor.write('\n[C]hat');

    cursor.hide();
  }
};
