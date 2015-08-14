(function() {

  'use strict';

  var debug = require('debug')('waybook:CommentController');

  function CommentController($scope, CommentService, $state) {
    debug('here we are (directive controller)');

    $scope.options = {
      userCommentFocus: false,
      showAll: false
    };

    $scope.model = {
      postId: $scope.post.id,
      comment: ''
    };

    $scope.createComment = function() {
      CommentService.create($scope.model).then(function(result){
        result.created = new Date();
        result.WaybookUser = $scope.user;
        $scope.post.Comment.push(result);
        $scope.model.comment = '';
        $scope.options.userCommentFocus = false;
      });
    };
  }

  module.exports = ['$scope', 'CommentService', '$state', CommentController];

}());
