module.exports = {
  header: function() {
    var status = '';

    if (global.user.inBattle) {
      status = ' in battle';
    }

    var header = global.user.name + ' is'+status+' at ('+global.user.pos.x+', '+global.user.pos.y+')\n';

    if (global.messages.length > 0) header += '\n';

    global.messages.forEach((msg) => {
      header += msg.name + ' says: ' + msg.message + '\n';
    });

    return header;
  }
};
