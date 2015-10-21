(function() {

  'use strict';

  function timelineScroll($timeout, $ionicScrollDelegate) {

    return {
      restrict: 'A',
      link: function(scope, el, attrs) {
        $timeout(function() {
          var scrollTo = document.getElementById(attrs.wayTimelineScroll);
          if (scrollTo) {
            $ionicScrollDelegate.scrollTo(0, scrollTo.offsetTop - ((window.innerHeight - 180) / 2));
          }
        });
      }
    };
  }

  module.exports = ['$timeout', '$ionicScrollDelegate', timelineScroll];

}());
