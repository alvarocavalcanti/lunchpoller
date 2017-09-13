var restaurants = require("./restaurants");

var polls = [];

// Function from: https://stackoverflow.com/a/6117889/1456509
Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

var getOptions = function() {
  result = [];
  restaurants.getRestaurants().forEach(function(restaurant) {
    result.push({ name: restaurant, votes: 0 });
  });
  return result;
};

exports.createPoll = function() {
  today = new Date();
  timestamp = +today;
  poll = {
    id: timestamp,
    week: today.getWeekNumber(),
    options: getOptions(),
    voters: [],
    closed: false
  };
  polls.push(poll);

  return poll;
};

exports.castVote = function(pollId, voterName, restaurant) {
};
