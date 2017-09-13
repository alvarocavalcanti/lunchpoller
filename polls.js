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

  for (i = 0; i < polls.length; i++) {
    poll = polls[i];
    pollDate = new Date(poll.id);
    if (pollDate.toDateString() == today.toDateString()) {
      return poll;
    }
  }

  poll = {
    id: timestamp,
    week: today.getWeekNumber(),
    options: getOptions(),
    voters: [],
    closed: false,
    chosen: ""
  };
  polls.push(poll);

  return poll;
};

exports.castVote = function(pollId, voterName, restaurant) {
  for (var i = 0; i < polls.length; i++) {
    var poll = polls[i];
    if (poll.id == pollId) {
      if (poll.voters.includes(voterName)) {
        return;
      }

      poll.options.forEach(function(option) {
        if (option.name == restaurant) {
          option.votes++;
          poll.voters.push(voterName);
        }
      }, this);
    }
  }
};

exports.closePoll = function(pollId) {
};

exports.getPolls = function() {
  return polls;
};

exports.deletePolls = function() {
  polls = [];
};

exports.getPoll = function(pollId) {
  for (var i = 0; i < polls.length; i++) {
    var element = polls[i];
    if (element.id == pollId) {
      return element;
    }
    return null;
  }
};
