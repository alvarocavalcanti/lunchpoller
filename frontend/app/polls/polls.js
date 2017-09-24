'use strict';

angular.module('myApp.polls', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/polls', {
    templateUrl: 'polls/polls.html',
    controller: 'PollsCtrl',
    controllerAs: 'vm'
  });
}])

.controller('PollsCtrl', ['$resource', function($resource) {
  var vm = this;

  vm.polls = [];

  vm.createPoll = function () {
    $resource('/api/polls').save().$promise.then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    getPolls();
  };

  vm.castVote = function (pollId, optionName) {
    console.log("castVote");
    getPolls();
  };

  vm.closePoll = function (pollId) {
    $resource('/api/polls/:pollId/close').save({pollId}, {}).$promise.then(
      (poll) => {
        console.log(poll)
      },
      (error) => {
        console.log(error);
      }
    );
    getPolls();
  };

  function getPolls() {
    $resource('/api/polls').query({}, {}).$promise.then(
      (polls) => {
        vm.polls = polls;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPolls();
}]);