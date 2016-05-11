const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');
const helpers = require('../helpers');
const userHelper = require('../user');

module.exports = local = {
  user: null,

  events: {
  },

  init: function(user) {
    local.user = user;
    user.inBattle = true;
  },

  write: function(cursor) {
    cursor.write(userHelper.header(local.user)).hide();
  }
};
