'use strict';

var mysql = require('mysql');
//var cache = require('node-cache');
var q = require('q');
var config = require('../../../../config/environment');

var PREPARE_LATEST_ARTICLE = 'SELECT * FROM wp_posts WHERE post_date > ? AND not (ID in (?)) limit ?';
var PREPARE_ARTICLE_IDS = 'SELECT * FROM wp_posts WHERE ID in (?)';
var PREPARE_META = 'SELECT * FROM wp_postmeta WHERE post_id in (?)';


/**
 * getIds - get articles by ids
 *
 * @param  {array} ids  list of ids
 * @return {object} deferred.promise
 */
function getIds (ids) {
  var idMap = {};
  var results = [];
  var deferred = q.defer();
  var conn;
  try {
    conn = _getConnection();
  } catch (err) {
    deferred.reject(new Error(err));
  }

  if (!ids.length) {
    ids = [ids];
  }

  conn.query(PREPARE_ARTICLE_IDS, [ids.join(',')], function (err, rows) {
    if (err) {
      deferred.reject(new Error(err));
    }

    idMap = _formatRows(rows);
    for (var i=0, j=ids.length; i<j; i++) {
      var id = ids[i];
      if (idMap[id]) {
        results.push(idMap[id]);
      } else {
        results.push({
            id: id,
            status: 404
          }
        );
      }
    }

    deferred.resolve(results);
  });

  return deferred.promise;
}


/**
 * getLatest - get articles by dates
 *
 * @param  {string} latestDate the date for the latest article
 * @param  {array} exceptIds  list of ids that should not be in the result list
 * @return {type} description
 */
function getLatest(latestDate, exceptIds) {
  var limit = 10;
  var deferred = q.defer();
  var conn;
  try {
    conn = _getConnection();
  } catch (err) {
    deferred.reject(new Error(err));
  }


  conn.query(PREPARE_LATEST_ARTICLE, [latestDate, exceptIds.join(','), limit], function (err, rows) {
    if (err) {
      deferred.reject(new Error(err));
    }
    deferred.resolve(_formatRows(results));
  });

  return deferred.promise;
}


/**
 * _getConnection
 *
 * @return {object}  connection object
 */
function _getConnection() {
  var conn = mysql.createConnection(config.dataSource.mysql);
  conn.connect(function (err) {
    if (err) {
      throw new Error(err);
    }
  });

  return conn;
}


/**
 * _formatRows
 *
 * @param  {object} rows mysql result rows
 * @return {object} formatted results
 */
function _formatRows(rows) {
  var results = {};

  for (var i=0, j=rows.length; i<j; i++) {
    var row = rows[i];
    var id = row.ID;
    var json = {};

    results[id] = {
        id: id,
        type: row.post_type,
        title: row.post_title ? row.post_title : '',
        summary: row.post_content ? row.post_content.substr(0, 400) + '...' : '',
        content: row.post_content ? row.post_content : '',
        date: row.post_date,
        tags: [],
        cover_image: "http://cdn.desktopwallpapers4.me/media/thumbs_400x250/3/21194.jpg",
        related_article_ids: [],
        status: 200
    };
  }

  return results;
}

module.exports = {
  getIds: getIds,
  getLatest: getLatest
}
