'use strict';

var should = require('should');
var app = require('../../../../../server/app');
var request = require('supertest');

describe('Article v1 GET API', function() {

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

  it('should return 1 object when one id is presented', function(done) {
    request(app)
      .get('/api/portfolio/v1/articles/1')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.size.should.equal(1);
        res.body.results[0].id.should.equal(1);
        res.body.results[0].status.should.equal(200);
        done();
      });
  });

  it('should return 3 objects when three ids are presented', function(done) {
    request(app)
      .get('/api/portfolio/v1/articles/1;2;3')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.size.should.equal(3);
        done();
      });
  });

  it('should return an objects with 404 if a wrong is presented', function(done) {
    request(app)
      .get('/api/portfolio/v1/articles/-999')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.results[0].status.should.equal(404);
        done();
      });
  });
/*
  it('should return related articles', function(done) {
    request(app)
      .get('/api/portfolio/v1/articles/1')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.results[0].related_articles.length.should.equal(res.body.results[0].related_article_ids.length);
        done();
      });
  });
  */
});
