'use strict';

var fs = require('fs');
var config = require('../../../../config/environment');

/**
 *
 */
var _getIds = function(ids, callback) {
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
      json.status = 200;
    } catch (err){
      json.id = id;
      json.status = 404;
    }
    jsonArr.push(json);
  }

  if (callback) {
    callback.call(this, jsonArr);
  }
}

module.exports = {
  get: _getIds
}
