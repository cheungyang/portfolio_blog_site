'use strict';

var should = require('should');
var lib = require('../../../../../server/api/portfolio/v1/models/articles.fs');

describe('Article files system model library', function() {

  it('should return an Object type', function() {
    lib.get(1).should.be.instanceof(Object);
  });

  it('should return 200 status for a valid id ', function() {
    (function (){
      (lib.get(1))[0].should.have.property('status', 200);
    }).should.not.throw();
  });

  it('should return 404 status for an invalid id ', function() {
    (function (){
      (lib.get(-999))[0].should.have.property('status', 404);
    }).should.not.throw();
  });

  it('should return a JSON object with id attribute', function() {
    (function (){
      (lib.get(1))[0].should.have.property('id', 1);
    }).should.not.throw();
  });

  it('should return two objects when two ids are called', function() {
    (function (){
      (lib.get([1,2])).should.have.lengthOf(2);
    }).should.not.throw();
  });
});
