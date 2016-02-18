function wayPostView($compile) {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      post: '=',
      user: '=',
      owner: '=',
      viewMode: '=',
      reshared: '@',
      hideShareButton: '@'
    },
    controller: 'PostViewController',
    templateUrl: 'components/post/view/postView.html',
    compile: function(element) {
      var contents = element.contents().remove();
      var contentsLinker;

      return function(scope, iElement) {
        if (angular.isUndefined(contentsLinker)) {
          contentsLinker = $compile(contents);
        }

        contentsLinker(scope, function(clonedElement) {
          iElement.append(clonedElement);
        });
      };
    }
  };
}

module.exports = wayPostView;
