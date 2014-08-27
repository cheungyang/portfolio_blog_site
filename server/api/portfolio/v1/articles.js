'use strict';

var now = require("performance-now");
var _ = require('lodash');

var model = require("./models/articles.fs");
var VERSION = "v1";

// Get list of things
exports.ids = function(req, res) {
  var start = now();
  var ids = req.params.ids.split(";");
  //FIXME remove this hack
  ids.push(2);
  ids.push(3);

  var results = model.get(ids);

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
};
