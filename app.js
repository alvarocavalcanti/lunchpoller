const express = require("express");
const app = express();
const port = 3000;

var restaurants = [
        "China Dragon",
        "Joe's Burguer",
        "Vegan Castle",
        "Bella Pasta",
        "Brazillian Steak",
        "Outback Flavors"
    ];

app.get("/", function(req, res) {
  res.send("Nothing to see here.");
});

app.get("/restaurants", function(req, res) {
  res.send(restaurants);
});

var server = app.listen(port, function() {
  console.log("App now listening on port: " + port);
});

module.exports = server;
