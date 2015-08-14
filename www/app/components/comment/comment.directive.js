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
      templateUrl: '/app/components/comment/comment.html',
      link: function(scope, el, attrs) {
      }
    };
  }

  module.exports = wayComment;

}());
