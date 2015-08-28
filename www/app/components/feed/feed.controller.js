(function() {

  'use strict';

  var debug = require('debug')('waybook:FeedController');

  function FeedController($scope, goal, $ionicPopover, $ionicPopup, $state, $ionicModal) {
    debug('here we are (directive controller)');

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

  module.exports = ['$scope', 'goal', '$ionicPopover', '$ionicPopup', '$state', '$ionicModal', FeedController];

}());
