'use strict';

angular.module('portfolioBlogSiteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/blog/:id',
        templateUrl: 'app/portfolio/blog.html',
        controller: 'BlogController'
      })
      .state('index', {
        url: '/',
        templateUrl: 'app/portfolio/blog.html',
        controller: 'BlogController',
        data: {
          id: 1
        }
      });
  });
