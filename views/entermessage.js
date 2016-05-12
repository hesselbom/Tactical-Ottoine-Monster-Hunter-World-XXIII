const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');
const helpers = require('../helpers');
const userHelper = require('../user');

module.exports = entermessage = {
  sockets: {
    'chat': function(data) {
      global.messages = data.messages;
      views.rewrite(entermessage);
    }
  },

  events: {
    [codes.ENTER]: function() {
      if (entermessage.message.length > 0) {
        global.socket.emit('chat', { message: entermessage.message });
      }
      views.set('game');
      return false;
    },

    '*': function(key, value) {
      if (value === codes.BACKSPACE) {
        entermessage.message = entermessage.message.substr(0, entermessage.message.length - 1);
      }
      else if (format.isAllowedInChat(value) && entermessage.message.length < 30) {
        entermessage.message += value;
      }

      views.rewrite(entermessage);
    }
  },

  init: function() {
    entermessage.message = '';
  },

  write: function(cursor) {
    cursor.write(userHelper.header());
    cursor.write('\nEnter message: ' + entermessage.message);
  }
};
