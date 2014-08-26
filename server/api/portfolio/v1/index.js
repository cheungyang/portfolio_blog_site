'use strict';

var express = require('express');
var router = express.Router();

var controller = {};
controller.articles = require('./articles');

router.get('/articles/:ids', controller.articles.ids);

module.exports = router;
