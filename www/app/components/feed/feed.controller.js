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

    $scope.reshare = function(post) {
      $scope.resharePopup = {};

      goal.getById(post.id, true).then(function(shared){
        $ionicModal.fromTemplateUrl('app/components/feed/reshare.html', {
          scope: $scope
        }).then(function(popup){
          $scope.resharePopup = popup;
          $scope.resharePopup.post = post;
          if ($scope.app.user.id === post.userId) {
            $scope.resharePopup.shared = shared;
          }
          $scope.resharePopup.show();
        });
      });
    };

  }

  module.exports = ['$scope', 'goal', '$ionicPopover', '$ionicPopup', '$state', '$ionicModal', FeedController];

}());
