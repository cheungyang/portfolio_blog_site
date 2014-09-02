'use strict';

var now = require('performance-now');
var q = require('q');
var config = require('../../../config/environment');
var model = require('./models/articles.' + config.dataSource.default);

var VERSION = "v1";
var start;


/**
 * articlesEndpoint - Get a list of articles
 *
 * @param  {object} req  description
 * @param  {object} res  description
 * @param  {object} next description
 * @return null
 */
function articlesEndpoint(req, res, next) {
  start = now();
  var deferQueue = [];
  var ids = req.params.ids.split(";");

  // Getting the requested IDs
  if (ids.length) {
    deferQueue.push(model.getIds(ids));
  }

  // Filling the page by getting addtional IDs
  //var latestDate = '2014-08-01';
  //deferQueue.push(model.getLatest(latestDate, ids));

  q.all(deferQueue).done(function (promiseResults) {
    //promiseResults.map(_getRelatedArticles);
    var jsonObj = _formatResults(promiseResults);
    jsonObj.debug = _debugInfo(req);
    res.json(jsonObj);

    //FIXME where the first next() is fired that this is not needed?
    //next();
  });
}


/**
 * _formatResults
 *
 * @param  {array} promiseResults promise results
 * @return {object}               json object
 */
function _formatResults(promiseResults, req) {
  return {
    results: promiseResults[0],
    //more_results: promiseResults[1],
    size: promiseResults[0] ? promiseResults[0].length : 0,
  };
}


/**
 * _debugInfo
 *
 * @param  {object} request object
 * @return {object}               json object
 */
function _debugInfo(req) {
  return {
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
  };
}


/**
 * _getRelatedArticles
 * This is a very ineffective way of getting related articles unless that model is highly cached
 *
 * @param  {object} results model fetch results
 * @return {object}         modified results with related articles
 */
function _getRelatedArticles(results) {
  // Fetch related articles
  for(var i=results.length-1; i>=0; i--) {
    var related_articles_ids = results[i].related_article_ids;
    if (related_articles_ids) {
      results[i].related_articles = model.getIds(related_articles_ids);
    }
  }
  return results;
};


module.exports = {
  ids: articlesEndpoint
}
