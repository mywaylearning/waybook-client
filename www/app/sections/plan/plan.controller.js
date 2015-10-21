(function() {

  'use strict';

  var debug = require('debug')('waybook:PlanController');

  function PlanController($scope, $state, $stateParams, posts, tags, PostService, $ionicLoading, $ionicHistory, $ionicModal, $ionicScrollDelegate, $timeout, $location, $window) {

    if (!$stateParams.tag) {
      var monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      var todayDate = new Date();
      var date = monthNames[todayDate.getMonth()] + '-' + todayDate.getFullYear();
      $location.hash(date);
      $timeout(function() {
        $ionicScrollDelegate.$getByHandle('timelineScroll').anchorScroll();
      }, 100);
    }

    $scope.hashMonth = function(date) {
      return date.toLowerCase().replace(' ', '-');
    };

    $scope.tags = tags;
    $scope.months = posts[1].plain().reverse();
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

      $state.go('app.plan', { tag: $scope.selectedTag }, { reload: true, notify: true });
    };

    $scope.createGoal = function() {
      $scope.postType = 'goal';
      $scope.createPopup = {};
      $ionicModal.fromTemplateUrl('app/sections/plan/create-goal.html', {
        scope: $scope
      }).then(function(popup){
        $scope.createPopup = popup;
        $scope.createPopup.show();
      });
    };

    $scope.onCreateGoal = function(post) {
      $state.go('app.plan');
      PostService.timelineByTag().then(function(response) {
        $scope.months = response[1].plain().reverse();
        $scope.posts = response[0].plain();
        $scope.createPopup.hide();
        console.log('handling response');
      });
      // var endDate = new Date(post.gEndDate);
      // var period = monthNames[endDate.getMonth()] + ' ' + endDate.getFullYear();
      // var found = false;
      // angular.forEach(Object.keys($scope.timeline), function(key) {
      //   if (period === key) {
      //     $scope.timeline[key].push(post);
      //     found = true;
      //   }
      // });
      //
      // if (!found) {
      //   $scope.timeline[period] = [post];
      // }
      // $scope.createPopup.hide();
    };

    $scope.onDoubleTap = function() {
      console.log('doubled tapped!');
    }
  }

  module.exports = ['$scope', '$state', '$stateParams', 'posts', 'tags', 'PostService', '$ionicLoading', '$ionicHistory', '$ionicModal', '$ionicScrollDelegate', '$timeout', '$location', '$window', PlanController];

}());
