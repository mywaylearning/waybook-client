function wayPostForm($timeout) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      post: '=',
      posts: '=',
      postType: '=type',
      sharedPost: '=',
      modalInstance: '=',
      onCreate: '&',
      onCancel: '&',
      deadline: '=',
      tags: '='
    },
    controller: 'PostFormController',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'components/post/form/postForm.html',
    link: function(scope, el, attrs) {
      if (scope.ctrl.postType) {
        $timeout(function() {
          var contentElement = el.find('#tags');
          contentElement[0].focus();
        }, 100);
      }

      scope.hasCallbackOnCreate = function() {
        return angular.isDefined(attrs.onCreate);
      };

      scope.hasCallbackOnCancel = function() {
        return angular.isDefined(attrs.onCancel);
      };
    }
  };
}

module.exports = ['$timeout', wayPostForm];
