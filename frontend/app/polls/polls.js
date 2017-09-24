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