(function() {

  'use strict';

  var debug = require('debug')('waybook:FeedController');

  function FeedController($scope, goal, $ionicPopover, $ionicPopup, $state) {
    debug('here we are (directive controller)');

    $scope.popover = {};

    $scope.popoverStatus = {};

    $ionicPopover.fromTemplateUrl('app/components/feed/post-actions.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
      $scope.popover.item = {};
    });

    $ionicPopover.fromTemplateUrl('app/components/feed/post-status.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popoverStatus = popover;
      $scope.popoverStatus.post = {};
    });

    $scope.showPopover = function($event, item) {
      $scope.popover.item = item;
      $scope.popover.show($event);
    };

    $scope.showPopoverStatus = function($event, post) {
      $scope.popoverStatus.post = post;
      $scope.popoverStatus.show($event);
    };

    $scope.deletePost = function(post) {
      $scope.popover.hide();

      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete post',
        template: 'Are you sure you want to delete this post?'
      });

     confirmPopup.then(function(res) {
       if(res) {
         post.remove().then(function() {
           var index = $scope.feed.items.indexOf(post);
           if (index > -1) $scope.feed.items.splice(index, 1);
         });
       }
     });
    };

    $scope.editPost = function(post) {
      $scope.popover.hide();
      post.editMode = true;
      post.justEdited = false;
    };

    $scope.editStatus = function(post, status) {
      $scope.popoverStatus.hide();
      var previousStatus = post.gStatus;
      post.gStatus = status;
      post.save().then(function(){

      }, function(err){
        post.gStatus = previousStatus;
      });
    };

    $scope.refresh = function() {
      goal.collection().then(function(result){
        $scope.feed = {
          items: result
        }
        // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.refresh();

  }

  module.exports = ['$scope', 'goal', '$ionicPopover', '$ionicPopup', '$state', FeedController];

}());
