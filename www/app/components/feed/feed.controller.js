(function() {

  'use strict';

  var debug = require('debug')('waybook:FeedController');

  function FeedController($scope, goal, $ionicPopover) {
    debug('here we are (directive controller)');

    $ionicPopover.fromTemplateUrl('app/components/feed/post-actions.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    // $scope.planData = {};
    //
    // $scope.doRefresh = function() {
    //   $scope.$broadcast('scroll.refreshComplete');
    // };

    // var ctrl = this;
    // ctrl.feed = goal.collection();
    // debug(ctrl.feed);

    this.feed = {
      items: goal.collection().$object
    };

  }

  module.exports = ['$scope', 'goal', '$ionicPopover', FeedController];

}());
