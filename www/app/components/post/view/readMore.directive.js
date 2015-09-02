(function() {

  'use strict';

  function readMore() {

    return {
      required: 'ngBindHtml',
      restrict: 'A',
      priority: 100,
      link: function ($scope, element, attrs, ctrl) {
        var needToHide = $scope.$parent.state.name !== 'app.main.post';

        if (!needToHide) {
          return;
        }

        var showMore = !$scope.$parent.post.originalShared;

        var showMoreElement = '<div class="read-more"><button class="button button-small button-clear icon-right ion-chevron-down">Show more</button></div>';

        $scope.hasHided = false;

        $scope.$watch(element.html(), function(value) {
          if (!$scope.hasHided) {
            // apply this code ONCE
            $scope.hasHided = true;
            if (element.height() > 150) { // need to hide
              element.css({
                maxHeight: 130,
                'overflow-y': 'hidden'
              }).append(showMoreElement);
            }
          }
        });

        if (showMore) {
          element.on('click', '.read-more', function(event) {
            event.preventDefault();
            event.stopPropagation();
            element.css({
              maxHeight: 'inherit',
              overflow: 'visible',
            });
            angular.element(this).remove();
          });
        }
      }
    };

  }

  module.exports = readMore;

}());
