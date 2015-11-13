(function() {

  'use strict';

  var debug = require('debug')('waybook:FeedController');

  function FeedController($scope, PostService, $ionicPopover, $ionicPopup, $state, $ionicModal) {
    debug('here we are (directive controller)');

    $scope.refresh = function() {
      PostService.collection($scope.postType).then(function(posts){
        $scope.posts = posts;
        // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
      });
    };

  }

  module.exports = ['$scope', 'PostService', '$ionicPopover', '$ionicPopup', '$state', '$ionicModal', FeedController];

}());
