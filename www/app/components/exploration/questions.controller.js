(function() {
  'use strict';

  function ExplorationQuestionsController($scope, $ionicSlideBoxDelegate) {

    $scope.slides = {
      index: 0,
      count: $scope.questions.length
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.slideHasChanged = function(index) {
      $scope.slides.index = index;
    };

  }

  module.exports = [
    '$scope',
    '$ionicSlideBoxDelegate',
    ExplorationQuestionsController
  ];
}())
