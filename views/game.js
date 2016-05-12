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
    chance: 0
  },
  {
    type: 'item',
    chance: 1
  }
];

function move(x, y) {
  global.user.pos.x += x;
  global.user.pos.y += y;

  var action = helpers.getBasedOnChance(potentialActions);
  switch(action.type) {
    case 'monster':
      views.set('battle', global.messages);
      break;
    case 'item':
    default:
      views.rewrite(game);
      break;
  }
};

module.exports = game = {
  sockets: {
    'chat': function(data) {
      global.messages = data.messages;
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
