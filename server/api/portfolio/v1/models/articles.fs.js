'use strict';

var fs = require('fs');

var FS_FOLDER = "../datasources/fs";

exports.get = function(ids) {
  var jsonArr = [];

  if (!ids.length) {
    ids = [ids];
  }

  for (var i=0, j=ids.length; i<j; i++) {
    var id = ids[i];
    var filename = FS_FOLDER + '/article_' + id + '.json';
    var json = {};
    try {
      json = require(filename);
      json.status = 200;
    } catch (err){
      json.status = 404;
    }
    json.id = id;
    jsonArr.push(json);
  }
  return jsonArr;
};
