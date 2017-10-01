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
        $httpBackend.expectGET('/api/polls')
        var pollsCtrl = $controller("PollsCtrl");
        $httpBackend.flush();
        expect(pollsCtrl).toBeDefined();
      })
    );

    it(
      "should fetch the polls from the backend upon creation",
      inject(function($controller) {
        $httpBackend.expectGET('/api/polls')
        var pollsCtrl = $controller("PollsCtrl");
        $httpBackend.flush();
        expect(pollsCtrl.polls.length).toBe(1);
      })
    );
  });
});
