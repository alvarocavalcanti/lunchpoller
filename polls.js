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

var getChosenForThisWeek = function(week) {
  var result = [];
  for (var i = 0; i < polls.length; i++) {
    var poll = polls[i];
    if (poll.closed && poll.week == week) {
      result.push(poll.chosen);
    }
  }
  return result;
};

var removeChosenOfTheCurrentWeek = function(options, week) {
  chosenForThisWeek = getChosenForThisWeek(week);
  newOptions = [];
  options.forEach(function(option) {
    if (!chosenForThisWeek.includes(option.name)) {
      newOptions.push(option);
    }
  }, this);
  return newOptions;
};

var getOptions = function(week) {
  result = [];
  restaurants.getRestaurants().forEach(function(restaurant) {
    result.push({ name: restaurant, votes: 0 });
  });
  return removeChosenOfTheCurrentWeek(result, week);
};

exports.createPoll = function() {
  today = new Date();
  timestamp = +today;

  for (i = 0; i < polls.length; i++) {
    poll = polls[i];
    pollDate = new Date(poll.id);
    if (pollDate.toDateString() == today.toDateString() && !poll.closed) {
      return poll;
    }
  }

  poll = {
    id: timestamp,
    week: today.getWeekNumber(),
    options: getOptions(today.getWeekNumber()),
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
  for (var i = 0; i < polls.length; i++) {
    var poll = polls[i];
    if (poll.id == pollId) {
      chosen = null;
      most_votes = 0;
      poll.options.forEach(function(option) {
        if (option.votes > most_votes) {
          most_votes = option.votes;
          chosen = option.name;
        }
      }, this);
      poll.chosen = chosen;
      poll.closed = true;
    }
  }
};

exports.getPolls = function() {
  return polls;
};

exports.deletePolls = function() {
  polls = [];
};

exports.getPoll = function(pollId) {
  for (var i = 0; i < polls.length; i++) {
    var poll = polls[i];
    if (poll.id == pollId) {
      return poll;
    }
    return null;
  }
};
