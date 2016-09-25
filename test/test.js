'use strict'

const
  assert  = require('assert'),
  request = require('supertest'),
  should  = require('should'),
  crypto  = require('crypto'),
  app     = require('../index'),
  giphy   = require('../lib/services/giphy'),
  cache   = require('../lib/services/cache');

/**
 * Router tests
 */
describe('Integration tests', function() {

  describe('Routing tests', function() {

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

    describe('DELETE /:queryText', function() {

      it('should remove the cached key', function(done) {
        request(app)
          .delete('/cat')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function(res) {
            should.exist(res.body.query);
          })
          .end(done);
      });

      let randomCharacters = crypto.randomBytes(20).toString('hex');

      it(`should return 404 if key wasn't found`, function(done) {
        request(app)
          .delete('/randomCharacters')
          .expect(404, done);
      });

    });

    describe('GET /', function() {
      it('should return 404', function(done) {
        request(app)
          .get('/')
          .expect(404, done);
      });
    });

  });

  describe('Giphy tests', function() {

    it('should return a gif', function(done) {
      giphy.search('something')
        .then(function(url) {
          (url).should.be.a.String();
          done();
        });
    });

    // this is to test if the promise rejects the query properly
    it('should NOT return a gif', function() {
      let randomCharacters = crypto.randomBytes(20).toString('hex');

      return giphy.search(randomCharacters)
        .then(function(url) {
          if (url) {
            throw new Error(`Found results for ${randomCharacters} (⊙_◎)`);
          }
        });
    });

  });   

  describe('Cache tests', function() {

    let insertedGiphy;

    it('should insert a record', function() {
      return cache.set((new Date()).getTime(), 'some url')
        .then(function(giphy) {
          insertedGiphy = giphy;
        });
    });

    it('should find a record by query', function() {
      return cache.get(insertedGiphy.query)
        .then(function(retrievedGiphy) {
          should.exists(retrievedGiphy);
          (retrievedGiphy.giphId).should.equal(insertedGiphy.giphId);
        });
    });

    it('should delete a record by id', function() {
      cache.delete(insertedGiphy.giphId)
        .then()
    });

  });

});

