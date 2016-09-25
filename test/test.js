'use strict'

const
	assert 	= require('assert'),
	request = require('supertest'),
	should 	= require('should'),
	app 		= require('../index');

/**
 * Router tests
 */
describe('GET /:queryText', function() {

  it('should return a gif when searched for "cat"', function(done) {
    request(app)
      .get('/cat')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function(res) {
      	should.exist(res.body.url);
      })
      .end(done);
  });

});

/**
 * Integration tests
 */

const
	giphy 	= require('../lib/services/giphy'),
	crypto 	= require('crypto');

describe('Integration tests', function() {

	describe('Giphy', function() {

	  it('should return a gif', function(done) {
	    giphy.search('something')
	    	.then(function(url) {
	    		(url).should.be.a.String();
	    		done();
	    	})
	    	.catch(console.error);
	  });

	  // this is to test if the promise rejects the query properly
	  it('should NOT return a gif', function() {
	  	let randomCharacters = crypto.randomBytes(20).toString('hex');

	    return giphy.search(randomCharacters)
	    	.then(function(url) {
	    		if (url) {
	    			throw new Error(`Found results for ${randomCharacters} (⊙_◎)`);
	    		}
	    	})
	    	.catch(console.error);
	  });

  });

});
