(function() {

  'use strict';

  var debug = require('debug')('waybook:CommentController');

  function CommentController($scope, CommentService, $state, $ionicPopup) {
    debug('here we are (directive controller)');

    $scope.options = {
      userCommentFocus: false,
      showAll: false,
      minCommentsToShow: 2
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

    $scope.deleteComment = function(comment) {
      // console.log(CommentService.getById(comment.id));
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete comment',
        template: 'Are you sure you want to delete this comment?'
      });

     confirmPopup.then(function(res) {
       if(res) {
         CommentService.delete(comment.id).then(function(result){
           var index = $scope.post.Comment.indexOf(comment);
           if (index > -1) $scope.post.Comment.splice(index, 1);
         });
       }
     });
    };

    $scope.showUpdateComment = function(comment) {
      comment.editMode = true;
    };

    $scope.updateComment = function(comment) {
      CommentService.update(comment).then(function(result){
        comment.editMode = false;
      });
    };
  }

  module.exports = ['$scope', 'CommentService', '$state', '$ionicPopup', CommentController];

}());
