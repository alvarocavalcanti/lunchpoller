'use strict';

describe('myApp.polls module', function() {

  beforeEach(module('myApp.polls'));

  describe('polls controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var pollsCtrl = $controller('PollsCtrl');
      expect(pollsCtrl).toBeDefined();
    }));

  });
});