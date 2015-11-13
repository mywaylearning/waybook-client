(function() {

  'use strict';

  var debug = require('debug')('waybook:PlanController');

  function PlanController($scope, $state, $stateParams, posts, tags, PostService, $ionicLoading, $ionicHistory) {

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (!$stateParams.tag) {
      var todayDate = new Date();
      var date = monthNames[todayDate.getMonth()].toLowerCase() + '-' + todayDate.getFullYear();
      $scope.scrollTo = date;
    }

    $scope.hashMonth = function(date) {
      return date.toLowerCase().replace(' ', '-');
    };

    $scope.tags = tags;
    $scope.months = posts[1].plain();
    $scope.posts = posts[0].plain();
    $scope.selectedTag = $stateParams.tag;

    $scope.getPosts = function(date) {
      return $scope.posts[date];
    };

    $scope.setTag = function() {
      if ($stateParams.tag === $scope.selectedTag) {
        return;
      }

      $ionicHistory.clearCache();
      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $ionicLoading.show({
        animation: 'fade-in',
        hideOnStateChange: true
      });

      $state.go('app.plan', { tag: $scope.selectedTag }, { reload: true });
    };

    $scope.createGoal = function(date) {
      var tmp = date.split(' ');
      var month = monthNames.indexOf(tmp[0]) + 1;
      var deadline = new Date(month + '/15/' + tmp[1]);

      $state.go('app.main.type', {type: 'goal', deadline: deadline, onCreate: onCreateGoal});
    };

    var onCreateGoal = function(post) {
      $state.go('app.plan');
      PostService.timelineByTag().then(function(response) {
        $scope.months = response[1].plain();
        $scope.posts = response[0].plain();
      });
    };
  }

  module.exports = ['$scope', '$state', '$stateParams', 'posts', 'tags', 'PostService', '$ionicLoading', '$ionicHistory', PlanController];

}());
