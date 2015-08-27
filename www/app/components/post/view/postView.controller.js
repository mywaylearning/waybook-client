(function() {

  'use strict';

  var debug = require('debug')('waybook:PostViewController');

  function PostViewController($scope, $state, router, goal, SWAGGER, $ionicPopover, $ionicPopup) {
    debug('here we are (directive controller)');

    debug(SWAGGER);

    $scope.showPopoverActions = function($event) {
      $ionicPopover.fromTemplateUrl('app/components/post/post-view-actions.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popoverActions = popover;
        $scope.popoverActions.show($event);
        console.log(popover);
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

    //Cleanup the popovers when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popoverActions.remove();
      $scope.popoverStatus.remove();
    });
  }

  module.exports = ['$scope', '$state', 'router', 'goal', 'SWAGGER', '$ionicPopover', '$ionicPopup', PostViewController];

}());
