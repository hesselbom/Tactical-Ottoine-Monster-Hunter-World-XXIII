module.exports = {
  header: function(user, messages) {
    var status = '';

    if (user.inBattle) {
      status = ' in battle';
    }

    var header = user.name + ' is'+status+' at ('+user.pos.x+', '+user.pos.y+')\n';

    messages.forEach((msg) => {
      header += msg.name + ': ' + msg.message + '\n';
    });

    return header;
  }
};
