function CommentController($scope, CommentService, $state, $ionicPopover, $ionicPopup) {
  'ngInject';

  $scope.state = $state.current;

  $scope.options = {
    userCommentFocus: false,
    showAll: false,
    minCommentsToShow: 1
  };

  $scope.model = {
    postId: $scope.post.id,
    comment: ''
  };

  $scope.popoverComment = {};
  $scope.activeComment = {};

  $scope.showPopoverComment = function($event, comment) {
    $ionicPopover.fromTemplateUrl('components/comment/comment-actions.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.activeComment = comment;
      $scope.popoverComment = popover;
      $scope.popoverComment.show($event);
    });
  };

  $scope.createComment = function() {
    CommentService.create($scope.model).then(function(result) {
      result.created = new Date();
      result.WaybookUser = $scope.user;
      $scope.post.Comment.push(result);
      $scope.model.comment = '';
      $scope.options.userCommentFocus = false;
    });
  };

  $scope.deleteComment = function(comment) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete comment',
      template: 'Are you sure you want to delete this comment?'
    });
    $scope.popoverComment.hide();

    confirmPopup.then(function(res) {
      if (res) {
        CommentService.delete(comment.id).then(function() {
          var index = $scope.post.Comment.indexOf(comment);
          if (index > -1) $scope.post.Comment.splice(index, 1);
        });
      }
    });
  };

  $scope.showUpdateComment = function(comment) {
    $scope.popoverComment.hide();
    comment.editMode = true;
    comment.copyComment = angular.copy(comment.comment);
  };

  $scope.cancelUpdate = function(comment) {
    comment.editMode = false;
    comment.comment = comment.copyComment;
  };

  $scope.updateComment = function(comment) {
    CommentService.update(comment).then(function() {
      comment.editMode = false;
    });
  };
}

module.exports = CommentController;
