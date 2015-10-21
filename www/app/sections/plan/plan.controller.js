(function() {

  'use strict';

  var debug = require('debug')('waybook:PlanController');

  function PlanController($scope, $state, $stateParams, posts, tags, PostService, $ionicLoading, $ionicHistory, $ionicModal) {
    $scope.tags = tags;
    $scope.timeline = posts[0].plain();
    $scope.selectedTag = $stateParams.tag;

    // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
      window.location.reload();
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

  module.exports = ['$scope', '$state', '$stateParams', 'posts', 'tags', 'PostService', '$ionicLoading', '$ionicHistory', '$ionicModal', PlanController];

}());
