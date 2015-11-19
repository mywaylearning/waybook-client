function wayComment() {
  return {
    restrict: 'E',
    scope: {
      post: '=',
      user: '='
    },
    controller: 'CommentController',
    templateUrl: 'components/comment/comment.html'
  };
}

module.exports = wayComment;
