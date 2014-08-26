'use strict';

var now = require("performance-now");
var _ = require('lodash');

var VERSION = "v1";

// Get list of things
exports.ids = function(req, res) {
  var start = now();
  var ids = req.params.ids.split(";");


  res.json({
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
