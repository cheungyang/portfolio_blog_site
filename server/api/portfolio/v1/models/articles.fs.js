'use strict';

var fs = require('fs');
var q = require('q');
var config = require('../../../../config/environment');


/**
 * getIds - get article jsons
 *
 * @param  {array} ids      list of article ids
 * @return {object}         q.deferred
 */
function getIds(ids) {
  var deferred = q.defer();
  var jsonArr = [];

  if (!ids.length) {
    ids = [ids];
  }

  for (var i=0, j=ids.length; i<j; i++) {
    var id = ids[i];
    var filename = config.dataSource.fs.folder + '/article_' + id + '.json';
    var json = {};
    try {
      json = require(filename);
      json._status = 200;
    } catch (err){
      json.id = id;
      json._status = 404;
    }
    jsonArr.push(json);
  }
  // Always resolve immediately
  deferred.resolve(jsonArr);

  return deferred.promise;
}


/**
 * getLatest - dump function to mock getting articles by date
 *
 * @param  {string} latestDate does not matter
 * @param  {array} exceptIds   does not matter
 * @return {type}              q.deferred
 */
function getLatest(latestDate, exceptIds) {
  return getIds([1,2]);
}

module.exports = {
  getIds: getIds,
  getLatest: getLatest
}
