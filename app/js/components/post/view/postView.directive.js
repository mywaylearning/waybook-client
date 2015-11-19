function wayPostView() {
  return {
    restrict: 'EA',
    scope: {
      post: '=',
      user: '='
    },
    transclude: true,
    controller: 'PostViewController',
    templateUrl: 'components/post/view/postView.html'
  };
}

module.exports = wayPostView;
