var supertest = require("supertest"),
  assert = require("assert"),
  app = require("../app");

exports.loads_restaurant_list = function(done) {
  supertest(app)
    .get("/restaurants")
    .expect(200)
    .end(function(err, response) {
      assert.ok(!err);
      assert.ok(Array.isArray(response.body), "Response body isnt an Array");
      done();
    });
};

exports.creates_a_poll = function(done) {
  supertest(app)
    .post("/polls")
    .expect(201)
    .end(function(err, response) {
      assert.ok(!err);
      poll = response.body;
      assert.ok(poll.id, "No Poll ID");
      assert.ok(typeof poll.week === "number", "No Poll Week");
      assert.ok(Array.isArray(poll.options), "No Poll Options");
      done();
    });
};

exports.casts_a_vote = function(done) {
  supertest(app)
    .post("/polls/" + poll.id + "/vote")
    .send({ name: "John", restaurant: "Chinese Dragon" })
    .expect(201)
    .end(function(err, response) {
      if (err) return done(err);
      assert.deepEqual(response.text, "John has cast a vote for Chinese Dragon");
      done();
    });
};
