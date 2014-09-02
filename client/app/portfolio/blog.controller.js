'use strict';

angular.module('portfolioBlogSiteApp')
  .controller('BlogController', function ($scope, $state, $stateParams, $http) {
    var id = $stateParams.id ? $stateParams.id : '';

    $http.get('/api/portfolio/v1/articles'+ (id ? '/'+id : '').success(function(json) {
      var articles = json.results;

      for(var i=0; i<articles.length; i++) {
        var article = articles[i];
        var date = new Date(article.date*1000); // JS date is measuring in ms instead of s
        article.date = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
      }
      $scope.articles = articles;
    });

/*
    var _toggleShortcuts = function(id) {
      var $article = $('#article-'+id);
      var $main = $article.find('.blog-main');
      var $shortcuts = $article.find('.blog-shortcuts');
      var $shortcutLis = $shortcuts.find('li');
      var $shortcutParent = $shortcuts.parent();
      var winTop = $(window).scrollTop();
      var mainRect = $main[0].getBoundingClientRect();
      var scRect = $shortcuts[0].getBoundingClientRect();
      var scMinTop = 80;
      var scMaxTop = mainRect.top + mainRect.height - scRect.height - winTop;
      var scInitTop;
      var currPos;  // [fixed|absolute]

      // Initial position of shortcuts submenu
      scInitTop = mainRect.top - winTop;
      if (scInitTop > scMaxTop){
        scInitTop = scMaxTop;
      } else if (scInitTop < scMinTop) {
        scInitTop = scMinTop;
      }

      // Variable to record current state of shortcut's position attribute
      var switchPosStrategy = function(){
        var t = $(window).scrollTop();
        if (t < scMaxTop - scInitTop && t >= winTop) {
          if (currPos === 'fixed'){
            return;
          }

          currPos = 'fixed';
          $shortcuts.css({
            top: scInitTop,
            left: mainRect.left + mainRect.width,
            position: currPos
          });
        }
        else {
          if (currPos === 'absolute'){
            return;
          }

          currPos = 'absolute';
          // Pinning the div onto the same location as fixed
          var scRect = $shortcuts[0].getBoundingClientRect();
          var scParentRect = $shortcuts.parent()[0].getBoundingClientRect();
          $shortcuts.css({
            top: scRect.top - scParentRect.top,
            left: scRect.left - scParentRect.left,
            position: currPos
          });
        }
      }

      if ($shortcuts.hasClass('display-none')) {
        // Initialize scroll handler
        switchPosStrategy();

        $shortcuts.removeClass('display-none');
        $(window).bind('scroll.switchPosStrategy_'+id, switchPosStrategy);

        // Shortcut li animation
        var i = 0;
        $shortcutLis.each(function(){
          var $that = $(this);
          $that.addClass('display-none').css({
            'margin-left': '30%',
            'opacity': 0
          });
          setTimeout(function(){
            $that.removeClass('display-none').css({
              'margin-left': 0,
              'opacity': 1
            });
          }, i * 100);
          i++;
        });
      } else {
        $shortcuts.addClass('display-none');
        $(window).unbind('scroll.switchPosStrategy_'+id, switchPosStrategy);
      }
    }
*/
    var _toggleShortcuts = function(id) {
      var $right = $('#right');
      var $article = $('#article-'+id);
      var $shortcuts = $('#article-sc-'+id);
      var $shortcutLis = $shortcuts.find('li');

      if ($shortcuts.hasClass('display-none')) {
        $right.empty().append($shortcuts);
        $shortcuts.removeClass('display-none');

        // Shortcut li animation
        var i = 0;
        $shortcutLis.each(function(){
          var $that = $(this);
          $that.addClass('display-none').css({
            'margin-left': '30%',
            'opacity': 0
          });
          setTimeout(function(){
            $that.removeClass('display-none').css({
              'margin-left': 0,
              'opacity': 1
            });
          }, i * 100);
          i++;
        });
      } else {
        $shortcuts.addClass('display-none').appendTo($article);
      }
    }

    var _expandArticle = function(id) {
      var $article = $('#article-'+id);
      var $expandable = $article.find('.blog-expandable');
      var $texts = $article.find('.blog-content, .blog-summary');
      var $main = $article.find('.blog-main');
      var $shortcuts = $article.find('.blog-shortcuts');
      var mainRect = $main[0].getBoundingClientRect();
      var mainExpandedHeight;

      // The expander trigger
      $expandable.toggleClass('display-none')
        .toggleClass('expandable-collapse')
        .toggleClass('expandable-expand')
        .find('.glyphicon').toggleClass('display-none');
      setTimeout(function(){
        // Re-show expandable when animation one
        $expandable.toggleClass('display-none');
      }, 500);

      // Main content
      $main.css('height', mainRect.height);
      $texts.each(function(){
        var $that = $(this);
        if ($that.hasClass('display-none')) {
          $that.addClass('height-calc').removeClass('display-none');
          mainExpandedHeight = $that.height();
          setTimeout(function(){
            $that.removeClass('height-calc')
          }, 0);
        } else {
          $that.addClass('display-none');
        }
      });
      setTimeout(function(){
        $main.css('height', mainExpandedHeight);
      }, 0);
    }

    $scope.expandArticle = function(id) {
      var $article = $('#article-'+id);
      _expandArticle(id);
      _toggleShortcuts(id);
    }
  });
