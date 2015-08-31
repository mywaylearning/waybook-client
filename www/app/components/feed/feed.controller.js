(function() {

  'use strict';

  var debug = require('debug')('waybook:FeedController');

  function FeedController($scope, PostService, $ionicPopover, $ionicPopup, $state, $ionicModal) {
    debug('here we are (directive controller)');

    $scope.refresh = function() {
      PostService.collection().then(function(result){
        $scope.feed = {
          items: result
        }
        // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.refresh();

  }

  module.exports = ['$scope', 'PostService', '$ionicPopover', '$ionicPopup', '$state', '$ionicModal', FeedController];

}());
