const
	assert = require('assert'),
	request = require('supertest');
	app = require('../index'),

/**
 * Router tests
 */
describe('GET /', function() {
  it('should return a gif', function(done) {
    request(app)
      .get('/cat')
      .expect(200, done);
  });
});
