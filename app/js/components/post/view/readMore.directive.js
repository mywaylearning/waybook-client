function readMore() {
  return {
    required: 'ngBindHtml',
    restrict: 'A',
    priority: 100,
    link: function($scope, element, attrs) {
      var showMoreElement = '<div class="read-more"><button class="button button-small button-clear icon-right ion-chevron-down">Show more</button></div>';

      if (attrs.readMore !== '' && attrs.readMore === 'app.main.post') {
        return;
      }

      $scope.hasHided = false;

      $scope.$watch(element.html(), function() {
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

      element.on('click', '.read-more', function(event) {
        event.preventDefault();
        event.stopPropagation();
        element.css({
          maxHeight: 'inherit',
          overflow: 'visible'
        });
        angular.element(this).remove();
      });
    }
  };
}

module.exports = readMore;
