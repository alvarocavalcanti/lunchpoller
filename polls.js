var restaurants = require("./restaurants");

var polls = [];

var getWeek = function() {
  return 0;
};

var getOptions = function() {
  result = [];
  restaurants.getRestaurants().forEach(function(restaurant) {
    result.push({ name: restaurant, votes: 0 });
  });
  return result;
};

exports.createPoll = function() {
  poll = {
    id: Date.now(),
    week: getWeek(),
    options: getOptions(),
    voters: [],
    closed: false
  };
  polls.push(poll);

  return poll;
};

exports.castVote = function(pollId, voterName, restaurant) {
};
