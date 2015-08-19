(function() {

  'use strict';

  var debug = require('debug')('waybook:FeedController');

  function FeedController($scope, goal, $ionicPopover, $ionicPopup, $state) {
    debug('here we are (directive controller)');

    $scope.popover = {};

    $ionicPopover.fromTemplateUrl('app/components/feed/post-actions.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
      $scope.popover.item = {};
    });

    $scope.showPopover = function($event, item) {
      $scope.popover.item = item;
      $scope.popover.show($event);
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
