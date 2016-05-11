module.exports = {
  header: function(user) {
    var status = '';

    if (user.inBattle) {
      status = ' in battle';
    }

    return user.name + ' is'+status+' at ('+user.pos.x+', '+user.pos.y+')';
  }
};
