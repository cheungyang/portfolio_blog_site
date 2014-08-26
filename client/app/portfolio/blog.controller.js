'use strict';

angular.module('portfolioBlogSiteApp')
  .controller('BlogController', function ($scope, $state, $stateParams, $http) {
    var id = $stateParams.id ? $stateParams.id : $state.current.data.id;

    $http.get('/api/portfolio/v1/articles/'+id).success(function(json) {
      var article = json.results[0];
      var date = new Date(article.date*1000); // JS date is measuring in ms instead of s
      article.date = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
      $scope.article = article;
    });
  });
