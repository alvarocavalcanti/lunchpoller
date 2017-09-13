var supertest = require('supertest'),
assert = require('assert'),
app = require('../app');

exports.loads_restaurant_list = function(done){
  supertest(app)
  .get('/restaurants')
  .expect(200)
  .end(function(err, response){
    assert.ok(!err);
    assert.ok(Array.isArray(response.body), 'Response body isnt an Array');
    return done();
  });
};
  