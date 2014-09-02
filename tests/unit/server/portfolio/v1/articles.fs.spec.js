'use strict';

var should = require('should');
var lib = require('../../../../../server/api/portfolio/v1/models/articles.fs');

describe('Article files system model library', function() {

  it('should return an Object type', function() {
    (function(){
      lib.getIds(1).then(function(results){
        results.should.be.instanceof(Object);
      });
    }).should.not.throw();
  });

  it('should return 200 status for a valid id ', function() {
    (function(){
      lib.getIds(1).then(function(results){
        results[0].should.have.property('_status', 200);
      })
    }).should.not.throw();
  });

  it('should return 404 status for an invalid id ', function() {
    (function(){
      lib.getIds(-999).then(function(results){
        results[0].should.have.property('_status', 404);
      })
    }).should.not.throw();
  });

  it('should return a JSON object with id attribute', function() {
    (function(){
      lib.getIds(1).then(function(results){
        results[0].should.have.property('id', 1);
      })
    }).should.not.throw();
  });

  it('should return two objects when two ids are called', function() {
    (function(){
      lib.getIds([1,2]).then(function(results){
        results.should.have.lengthOf(2);
      })
    }).should.not.throw();
  });
});
