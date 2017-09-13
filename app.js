const express = require("express");
const app = express();
const port = 3000;

var restaurants = [
  "Chinese Dragon",
  "Joe's Burguer",
  "Vegan Castle",
  "Bella Pasta",
  "Brazillian Steak",
  "Outback Flavors"
];

var polls = [];

var getWeek = function() {
  return 0;
};

var getOptions = function() {
  result = [];
  restaurants.forEach(function(restaurant) {
    result.push({ name: restaurant, votes: 0 });
  });
  return result;
};

var createPoll = function() {
  return {
    id: Date.now(),
    week: getWeek(),
    options: getOptions(),
    voters: [],
    closed: false
  };
};

var castVote = function(pollId, voterName, restaurant) {
};

// Routing
app.get("/", function(req, res) {
  res.send("Nothing to see here.");
});

app.get("/restaurants", function(req, res) {
  res.send(restaurants);
});

app.get("/polls", function(req, res) {
  res.status(200).send(polls);
});

app.post("/polls", function(req, res) {
  newPoll = createPoll();
  polls.push(newPoll);
  res.status(201).send(newPoll);
});

app.post("/polls/:pollId/votes/:name/:restaurant", function(req, res) {
  pollId = req.params.pollId
  voterName = req.params.name;
  restaurant = req.params.restaurant;
  castVote(pollId, voterName, restaurant);
  res
    .status(201)
    .send(voterName + " has cast a vote for " + restaurant);
});

var server = app.listen(port, function() {
  console.log("App now listening on port: " + port);
});

module.exports = server;
