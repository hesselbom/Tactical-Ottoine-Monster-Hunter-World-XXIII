const align = require('align-text');
const format = require('../format');
const views = require('../views');
const codes = require('../codes');
const helpers = require('../helpers');
const userHelper = require('../user');

var potentialActions = [
  {
    type: 'nothing',
    chance: 100
  },
  {
    type: 'monster',
    chance: 10000
  },
  {
    type: 'item',
    chance: 1
  }
];

function move(x, y) {
  local.user.pos.x += x;
  local.user.pos.y += y;

  var action = helpers.getBasedOnChance(potentialActions);
  switch(action.type) {
    case 'monster':
      views.set('battle', local.user);
      break;
    case 'item':
    default:
      views.rewrite(local);
      break;
  }
};

module.exports = local = {
  events: {
    [codes.LEFT]:  move.bind(this, -1, 0),
    [codes.RIGHT]: move.bind(this, 1, 0),
    [codes.UP]:    move.bind(this, 0, -1),
    [codes.DOWN]:  move.bind(this, 0, 1)
  },

  init: function(user) {
    local.user = user;
  },

  write: function(cursor) {
    cursor.write(userHelper.header(local.user)).hide();
  }
};
