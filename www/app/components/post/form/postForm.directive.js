(function() {

  'use strict';

  function wayPostForm($timeout) {

    return {
      restrict: 'EA',
      scope: {
        post: '=',
        posts: '=',
        postType: '=type',
        sharedPost: '=',
        modalInstance: '=',
        onCreate: '&',
        deadline: '='
      },
      controller: 'PostFormController',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: '/app/components/post/form/postForm.html',
      link: function(scope, el, attrs) {
        if (scope.ctrl.postType) {
          $timeout(function(){
            var contentElement = el.find('#tags');
            contentElement[0].focus();
          }, 100);
        }

        scope.hasCallbackOnCreate = function() {
          return angular.isDefined(attrs.onCreate);
        }

      }
    };
  }

  module.exports = ['$timeout', wayPostForm];

}());
