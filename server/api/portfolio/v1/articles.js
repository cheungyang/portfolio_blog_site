'use strict';

var now = require("performance-now");
var config = require('../../../config/environment');
var model = require("./models/articles." + config.dataSource.default);

var VERSION = "v1";

/**
 *  Get a list of articles
 **/
var _getIds = function(req, res, next) {
  var start = now();
  var ids = req.params.ids.split(";");

  model.get(ids, function(results){
    _formatResults(req, res, next, results);
  });
}

var _formatResults = function(req, res, next, results) {
  // Fetch related articles
  for(var i=results.length-1; i>=0; i--) {
    var related_articles_ids = results[i].related_article_ids;
    if (related_articles_ids) {
      results[i].related_articles = model.get(related_articles_ids);
    }
  }

  res.json({
    results: results,
    size: results.length,
    _req: {
      params: req.params,
      query: req.query,
      body: req.body,
      cookies: req.cookies,
      route: req.route,
      headers: req.headers,

    },
    _version: VERSION,
    _elapsed: (now()-start).toFixed(3)
  });

  next();
};


module.exports = {
  ids: _getIds
}
