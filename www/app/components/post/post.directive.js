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
        if (scope.ctrl.postType) {
          $timeout(function(){
            var contentElement = el.find('#tags');
            contentElement[0].focus();
          }, 100);
        }

      }
    };
  }

  module.exports = ['$timeout', wayPost];

}());
