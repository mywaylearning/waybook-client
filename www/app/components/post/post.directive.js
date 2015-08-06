(function() {

  'use strict';

  function wayPost($timeout) {

    return {
      restrict: 'EA',
      scope: {
        postType: '@type'
      },
      controller: 'PostController',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: '/app/components/post/post.html',
      link: function(scope, el, attrs) {
        var contentElement = el.find('.textarea');

        if (scope.ctrl.postType) {
          $timeout(function(){
            contentElement[0].focus();
          });
        }

      }
    };
  }

  module.exports = ['$timeout', wayPost];

}());
