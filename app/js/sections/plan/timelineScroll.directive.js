/* eslint angular/document-service: 0 */
function timelineScroll($timeout, $ionicScrollDelegate) {
  'ngInject';
  return {
    restrict: 'A',
    link: function(scope, el, attrs) {
      var scrollTo;
      $timeout(function() {
        scrollTo = document.getElementById(attrs.wayTimelineScroll);
        if (scrollTo) {
          $ionicScrollDelegate.scrollTo(0, scrollTo.offsetTop - ((window.innerHeight - 180) / 2), true);
        }
      }, 500);
    }
  };
}

module.exports = timelineScroll;
