const express = require("express");
const polls = require("./polls");
const restaurants = require("./restaurants");
const app = express();
const port = 3000;

app.get("/", function(req, res) {
  res.send("Nothing to see here.");
});

app.get("/restaurants", function(req, res) {
  res.send(restaurants.getRestaurants());
});

app.get("/polls", function(req, res) {
  res.status(200).send(polls).getPolls();
});

app.post("/polls", function(req, res) {
  newPoll = polls.createPoll();
  res.status(201).send(newPoll);
});

app.post("/polls/:pollId/close", function(req, res) {
  pollId = req.params.pollId
  polls.closePoll(pollId);
  poll = polls.getPoll(pollId);

  res
    .status(200)
    .send(poll);
});

app.post("/polls/:pollId/votes/:name/:restaurant", function(req, res) {
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

module.exports = server;
