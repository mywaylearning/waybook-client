(function() {

  'use strict';

  var debug = require('debug')('waybook:FeedController');

  function FeedController($scope, goal, $ionicPopover, user) {
    debug('here we are (directive controller)');

    $scope.user = user.currentUser().$object;

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
      post.remove().then(function() {
        var index = $scope.feed.items.indexOf(post);
        if (index > -1) $scope.feed.items.splice(index, 1);
        $scope.popover.hide();
      });
    };

    // $scope.planData = {};
    //
    // $scope.doRefresh = function() {
    //   $scope.$broadcast('scroll.refreshComplete');
    // };

    // var ctrl = this;
    // ctrl.feed = goal.collection();
    // debug(ctrl.feed);

    $scope.feed = {
      items: goal.collection().$object
    };

  }

  module.exports = ['$scope', 'goal', '$ionicPopover', 'user', FeedController];

}());
