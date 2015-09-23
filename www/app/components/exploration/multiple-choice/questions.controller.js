(function() {
  'use strict';

  function ExplorationQuestionsController($scope, $ionicSlideBoxDelegate) {

    $scope.slides = {
      index: 0,
      count: Object.keys($scope.exploration.questions).length
    };

    angular.forEach($scope.exploration.questions, function(question, index) {
      question.order = parseInt(question.order);

      if (!question.answer && $scope.slides.index === 0) {
        $scope.slides.index = index;
      }
    });

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
