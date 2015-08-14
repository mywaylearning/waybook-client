(function() {

  'use strict';

  function wayComment() {

    return {
      restrict: 'E',
      scope: {
        post: '=',
        user: '='
      },
      controller: 'CommentController',
      templateUrl: '/app/components/comment/comment.html'
    };
  }

  module.exports = wayComment;

}());
