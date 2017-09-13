const polls = require("../polls");
const assert = require("assert");

describe('The Polls module', function() {
  beforeEach(function () {
    polls.deletePolls();
  });

  it('creates a poll', function () {
    poll = polls.createPoll();
    assert.ok(poll.id, "No ID");
    assert.ok(poll.week > 0, "Invalid week");
    assert.ok(Array.isArray(poll.options), "Invalid options");
    assert.equal(poll.voters.length, 0, "Non-empty voters");
    assert.ok(!poll.closed, "Closed Poll");
    assert.equal("", poll.chosen);
  });

  it('does not create a second poll for the same day and returns the existing one', function () {
    firstPoll = polls.createPoll();
    secondPoll = polls.createPoll();

    currentPolls = polls.getPolls();

    assert.equal(currentPolls.length, 1, "There is more than one Poll.")
    assert.equal(firstPoll, secondPoll, "The two Polls are different.")
  });

  it('casts a vote to a poll', () => {
    poll = polls.createPoll();
    polls.castVote(poll.id, "John", "Chinese Dragon");
    poll = polls.getPoll(poll.id);

    assert.equal(poll.voters.length, 1, "Voter count different than 1");
    assert.equal(poll.options[0].votes, 1, "Vote not computed for Chinese Dragon");
  });

  it('does not compute duplicated vote', () => {
    poll = polls.createPoll();
    polls.castVote(poll.id, "John", "Chinese Dragon");
    polls.castVote(poll.id, "John", "Chinese Dragon");
    poll = polls.getPoll(poll.id);

    assert.equal(poll.voters.length, 1, "Voter count different than 1");
    assert.equal(poll.options[0].votes, 1, "Vote not computed for Chinese Dragon");
  });
});