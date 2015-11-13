'use strict';

function IntroController($scope, $state, $ionicSlideBoxDelegate) {
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $scope.goToSlide = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  }
}

module.exports = [
  '$scope', '$state', '$ionicSlideBoxDelegate',
  IntroController
];
