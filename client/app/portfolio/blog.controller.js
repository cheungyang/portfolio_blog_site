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
      var $shortcuts = $('#shortcuts');
      var $shortcutLis = $shortcuts.find('li');
      var $shortcutParent = $shortcuts.parent();
      var winTop = $(window).scrollTop();
      var initTop;
      var scMinTop = 80, scMaxTop;
      var mainContentH;

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
      $main.css('height', $main.height());
      $texts.each(function(){
        var $that = $(this);
        if ($that.hasClass('display-none')) {
          $that.addClass('height-calc').removeClass('display-none');
          mainContentH = $that.height();
          setTimeout(function(){
            $that.removeClass('height-calc')
          }, 0);
        } else {
          $that.addClass('display-none');
        }
      });
      setTimeout(function(){
        $main.css('height', mainContentH+'px');
      }, 0);


      // Left submenu shortcut
      initTop = $main.offset().top - winTop
      scMaxTop = initTop + mainContentH - $shortcuts.height();
      if (initTop > scMaxTop){
        initTop = scMaxTop;
      } else if (initTop < scMinTop) {
        initTop = scMinTop;
      }

      // Variable to record current state of shortcut's position attribute
      var currPos;
      var switchPosStrategy = function(){
        if ($(window).scrollTop() < scMaxTop - initTop && $(window).scrollTop() >= winTop) {
          if (currPos === 'fixed'){
            return;
          }
          currPos = 'fixed';
          $shortcuts.css({
            top: initTop,
            left: '',
            width: '',
            position: '',
          });
        } else {
          if (currPos === 'absolute'){
            return;
          }
          currPos = 'absolute';
          var o = $shortcuts.offset();
          var p = $shortcutParent.offset();
          $shortcuts.css({
            top: o.top - p.top,
            left: o.left - p.left,
            width: $shortcuts.width(),
            position: 'absolute'
          });
        }
      }

      if ($shortcuts.hasClass('display-none')) {
        // Initialize scroll handler
        switchPosStrategy();

        $shortcuts.removeClass('display-none');
        $(window).bind('scroll.switchPosStrategy', switchPosStrategy);

        // Shortcut li animation
        var i = 0;
        $shortcutLis.each(function(){
          var $that = $(this);
          $that.addClass('display-none').css({
            'margin-right': '30%',
            'opacity': 0
          });
          setTimeout(function(){
            $that.removeClass('display-none').css({
              'margin-right': 0,
              'opacity': 1
            });
          }, i * 100);
          i++;
        });
      } else {
        $shortcuts.addClass('display-none');
        $(window).unbind('scroll.switchPosStrategy', switchPosStrategy);
      }
    }
  });
