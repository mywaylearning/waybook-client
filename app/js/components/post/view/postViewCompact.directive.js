function wayPostViewCompact() {
  'ngInject';
  return {
    restrict: 'EA',
    scope: {
      post: '=',
      user: '='
    },
    templateUrl: 'components/post/view/postViewCompact.html'
  };
}

module.exports = wayPostViewCompact;
