(function() {

  'use strict';

  var debug = require('debug')('waybook:PostViewController');

  function PostViewController($scope, $state, $timeout, PostService, SWAGGER, $ionicPopover, $ionicPopup, $ionicModal) {
    debug('here we are (directive controller)');

    debug(SWAGGER);

    $scope.state = $state.current;

    $scope.showPopoverActions = function($event) {
      $ionicPopover.fromTemplateUrl('app/components/post/view/post-view-actions.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popoverActions = popover;
        $scope.popoverActions.show($event);
      });
    };


    $scope.showPopoverStatus = function($event) {
      $ionicPopover.fromTemplateUrl('app/components/post/view/post-view-status.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popoverStatus = popover;
        $scope.popoverStatus.show($event)
      });
    };


    $scope.editStatus = function(post, status) {
      $scope.popoverStatus.hide();
      var previousStatus = $scope.post.gStatus;
      $scope.post.gStatus = status;
      $scope.post.save().then(function(){

      }, function(err){
        $scope.post.gStatus = previousStatus;
      });
    };

    $scope.deletePost = function() {
      $scope.popoverActions.hide();

      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete post',
        template: 'Are you sure you want to delete this post?'
      });

     confirmPopup.then(function(res) {
       if(res) {
         $scope.post.remove().then(function() {
          // Check if it's child of items repeat
          if ($scope.$parent.$parent.feed) {
            var feed = $scope.$parent.$parent.feed;
            var index = feed.items.indexOf($scope.post);
            if (index > -1) feed.items.splice(index, 1);
          } else {
            // if not, redirect to main feed
            $state.go('app.main', {}, {reload: true});
          }


         });
       }
     });
    };

    $scope.editPost = function() {
      $scope.popoverActions.hide();
      $scope.post.editMode = true;
      $scope.post.justEdited = false;
    };

    $scope.shareInfo = function() {
      $scope.popoverActions.hide();
      $scope.shareInfoPopup = {};
      PostService.getById($scope.post.id, true).then(function(shared){
        $ionicModal.fromTemplateUrl('app/components/post/view/share-info.html', {
          scope: $scope
        }).then(function(popup){
          $scope.shareInfoPopup = popup;
          if ($scope.user.id === $scope.post.userId) {
            $scope.post.shared = shared;
          }
          $scope.shareInfoPopup.show();
        });
      });
    };

    $scope.reshare = function(post, $event) {
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }

      $scope.sharingPost = post || $scope.post;
      $scope.resharePopup = {};
      $ionicModal.fromTemplateUrl('app/components/post/view/re-share.html', {
        scope: $scope
      }).then(function(popup){
        $scope.resharePopup = popup;
        $scope.resharePopup.show();
      });
    };

    //Cleanup the popovers when we're done with it!
    $scope.$on('$destroy', function() {
      if ($scope.popoverActions) {
          $scope.popoverActions.remove();
      }

      if ($scope.popoverStatus) {
        $scope.popoverStatus.remove();
      }

    });
  }

  module.exports = ['$scope', '$state', '$timeout', 'PostService', 'SWAGGER', '$ionicPopover', '$ionicPopup', '$ionicModal', PostViewController];

}());
