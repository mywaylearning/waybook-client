(function() {

  'use strict';

  var debug = require('debug')('waybook:PlanController');

  function PlanController($scope, $state, $stateParams, posts, tags, PostService, $ionicLoading, $ionicHistory) {
    $scope.tags = tags;
    $scope.timeline = posts[0].plain();
    $scope.selectedTag = $stateParams.tag;

    $scope.setTag = function() {
      if ($stateParams.tag === $scope.selectedTag) {
        return;
      }
      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        hideOnStateChange: true
      });

      $state.go('app.plan', { tag: $scope.selectedTag }, { location: 'replace' });
      // PostService.timelineByTag($scope.selectedTag).then(function(response) {
      //   $scope.timeline = response[0].plain();
      //   $ionicLoading.hide();
      // });
    }
  }

  module.exports = ['$scope', '$state', '$stateParams', 'posts', 'tags', 'PostService', '$ionicLoading', '$ionicHistory', PlanController];

}());
