module.exports = {
  getBasedOnChance: function(options) {
    var total = 0;
    options.forEach((o) => {
      total += o.chance;
    });

    var random_num = Math.random() * total;
    var weight_sum = 0;

    for (var i = 0; i < options.length; i++) {
      weight_sum += options[i].chance;
      weight_sum = +weight_sum.toFixed(2);

      if (random_num <= weight_sum) {
        return options[i];
      }
    }
  }
};
