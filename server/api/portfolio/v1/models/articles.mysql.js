'use strict';

var mysql = require('mysql');
var config = require('../../../../config/environment');

var PREPARE_ARTICLE_SQL = 'SELECT * FROM wp_posts WHERE ID in (?)';
var PREPARE_META_SQL = 'SELECT * FROM wp_postmeta WHERE post_id = ?';

var _getIds = function(ids, callback) {
  var jsonArr = [];
  var conn;

  if (!ids.length) {
    ids = [ids];
  }

  conn = mysql.createConnection(config.dataSource.mysql);
  conn.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
    }
  });
  conn.query(PREPARE_ARTICLE_SQL, [ids.join(',')], function (err, rows) {
    if (err) {
      return console.error(err);
    }

    var results = {};
    for (var i=0, j=rows.length; i<j; i++) {
      results[rows[i].ID] = rows[i];
    }

    for (var i=0, j=ids.length; i<j; i++) {
      var id = ids[i];
      var result = results[id];
      var json = {};

      if (result) {
        json = {
          id: result.ID,
          type: "article",
          title: result.post_title ? result.post_title : '',
          summary: result.post_content ? result.post_content.substr(0, 400) + '...' : '',
          content: result.post_content ? result.post_content : '',
          date: result.post_date,
          tags: [],
          cover_image: "http://cdn.desktopwallpapers4.me/media/thumbs_400x250/3/21194.jpg",
          related_article_ids: [],
          status: 200
        };
      } else {
        json = {
          id: id,
          status: 404
        }
      }
      jsonArr.push(json);
    }

    callback.call(this, jsonArr);
  });
}

module.exports = {
  get: _getIds
}
