'use strict';

var should = require('should');
var app = require('../../../../../server/app');
var request = require('supertest');

describe('article v1 GET API', function() {

  it('should respond with JSON object', function(done) {
    request(app)
      .get('/api/portfolio/v1/articles/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });
});
