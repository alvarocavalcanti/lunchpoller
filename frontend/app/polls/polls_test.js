"use strict";

describe("myApp.polls module", function() {
  var $httpBackend, pollsRequestHandler;
  beforeEach(module("myApp.polls"));

  beforeEach(
    inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get("$httpBackend");
      // backend definition common for all tests
      pollsRequestHandler = $httpBackend
        .when("GET", "/api/polls")
        .respond(200, [{
          "id": 1,
          "week": 1,
          "options": [{
            "restaurant": "rest1", "votes": 0
          }],
          "voters": [],
          "closed": "false",
          "chosen": ""
        }]);
    })
  );

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("polls controller", function() {
    it(
      "should define PollsCtrl",
      inject(function($controller) {
        $httpBackend.expectGET("/api/polls");
        var pollsCtrl = $controller("PollsCtrl");
        $httpBackend.flush();
        expect(pollsCtrl).toBeDefined();
      })
    );

    it(
      "should fetch the polls from the backend upon creation",
      inject(function($controller) {
        $httpBackend.expectGET("/api/polls");
        var pollsCtrl = $controller("PollsCtrl");
        $httpBackend.flush();
        expect(pollsCtrl.polls.length).toBe(1);
        expect(pollsCtrl.polls[0].id).toBe(1);
        expect(pollsCtrl.polls[0].week).toBe(1);
      })
    );

    it(
      "should ask the user's name when casting a vote",
      inject(function($controller) {
        spyOn(window, "prompt").and.callFake(function() {
          return "John";
        });
        var pollsCtrl = $controller("PollsCtrl");
        $httpBackend.expectPOST("/api/polls/1/votes/John/pizzashack");
        pollsCtrl.castVote(1, "pizzashack");
        $httpBackend.flush();
      })
    );
  });
});
