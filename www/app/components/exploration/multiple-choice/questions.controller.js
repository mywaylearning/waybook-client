(function() {
  'use strict';

  function ExplorationQuestionsController($scope, $ionicSlideBoxDelegate) {

    console.log($scope.exploration);

    $scope.questions = $scope.exploration.questions;

    $scope.answers = $scope.exploration.answers;

    $scope.slides = {
      index: 0,
      count: Object.keys($scope.questions).length
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
