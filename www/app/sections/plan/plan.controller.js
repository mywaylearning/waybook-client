(function() {

  'use strict';

  var debug = require('debug')('waybook:PlanController');

  function PlanController($scope, $state, posts, tags, PostService, $ionicLoading) {
    $scope.tags = tags;
    $scope.timeline = posts[0].plain();

    $scope.setTag = function() {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        hideOnStateChange: true
      });
      PostService.timelineByTag($scope.selectedTag).then(function(response) {
        $scope.timeline = response[0].plain();
        $ionicLoading.hide();
      });
    }
  }

  module.exports = ['$scope', '$state', 'posts', 'tags', 'PostService', '$ionicLoading', PlanController];

}());
