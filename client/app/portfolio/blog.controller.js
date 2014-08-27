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


    $scope.myData = {};
    $scope.myData.doClick = function() {
      var $expandable = $('.blog-expandable');
      var $texts = $('.blog-content, .blog-summary');
      var $main = $('.blog-main');
      var h;

      $expandable.toggleClass('display-none')
        .toggleClass('expandable-collapse')
        .toggleClass('expandable-expand')
        .find('.glyphicon').toggleClass('display-none');

      $main.css('height', $main.height());
      $texts.each(function($text){
        debugger;
        var $that = $(this);
        if ($that.hasClass('display-none')) {
          $that.addClass('height-calc').removeClass('display-none');
          h = $that.height();
          setTimeout(function(){
            $that.removeClass('height-calc')
          }, 0);
        } else {
          $that.addClass('display-none');
        }
      });

      // Re-show expandable when animation done
      setTimeout(function(){
        $main.css('height', h+'px');
        $expandable.toggleClass('display-none');
      }, 10);

    }
  });
