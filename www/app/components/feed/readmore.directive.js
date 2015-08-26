(function() {

  'use strict';

  function readMore() {

    return {
      required: 'ngBindHtml',
      restrict: 'A',
      priority: 100,
      link: function ($scope, element, attrs, ctrl) {
        $scope.hasHided = false;
        var showMore = '<div class="show-more-area"><button class="button button-small button-clear icon-right ion-chevron-down">Show more</button></div>';
        $scope.$watch(element.html(), function(value) {
          if (!$scope.hasHided) {
            // apply this code ONCE
            $scope.hasHided = true;
            if (element.height() > 150) { // need to hide
              element.css({
                maxHeight: 130,
                'overflow-y': 'hidden'
              }).append(showMore);

              element.on('click', '.show-more-area', function() {
                element.css({
                  maxHeight: 'inherit',
                  overflow: 'visible',
                });
                angular.element(this).remove();
              });
            }
          }
        });
      }
    };

  }

  module.exports = readMore;

}());
