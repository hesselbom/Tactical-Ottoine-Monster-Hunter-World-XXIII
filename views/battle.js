const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');
const helpers = require('../helpers');
const userHelper = require('../user');

module.exports = battle = {
  sockets: {
    'chat': function(data) {
      global.messages = data.messages;
      views.rewrite(battle);
    }
  },

  events: {
  },

  write: function(cursor) {
    cursor.write(userHelper.header()).hide();
  }
};
