const express = require("express");
const polls = require("./polls");
const restaurants = require("./restaurants");
const app = express();
const morgan = require('morgan');
const port = 3000;

app.use(morgan('combined'));

app.get("/", function(req, res) {
  res.send("Nothing to see here.");
});

app.get("/api/restaurants", function(req, res) {
  res.send(restaurants.getRestaurants());
});

app.get("/api/polls", function(req, res) {
  res.status(200).send(polls.getPolls());
});

app.post("/api/polls", function(req, res) {
  newPoll = polls.createPoll();
  res.status(201).send(newPoll);
});

app.get("/api/polls/:pollId", function(req, res) {
  pollId = req.params.pollId
  res
    .status(200)
    .send(polls.getPoll(pollId));
});

app.post("/api/polls/:pollId/close", function(req, res) {
  pollId = req.params.pollId
  polls.closePoll(pollId);
  poll = polls.getPoll(pollId);

  res
    .status(200)
    .send(poll);
});

app.post("/api/polls/:pollId/votes/:name/:restaurant", function(req, res) {
  pollId = req.params.pollId
  voterName = req.params.name;
  restaurant = req.params.restaurant;
  polls.castVote(pollId, voterName, restaurant);
  res
    .status(201)
    .send(voterName + " has cast a vote for " + restaurant);
});

var server = app.listen(port, function() {
  console.log("App now listening on port: " + port);
});

// Just a simple comment...

module.exports = server;
