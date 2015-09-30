(function() {
  'use strict';

  function ExplorationQuestionsController($scope, $ionicSlideBoxDelegate) {

    $scope.slides = {
      index: 0,
      keepFirst: false,
      count: Object.keys($scope.exploration.questions).length,
      completed: []
    };

    angular.forEach($scope.exploration.questions, function(question, index) {
      question.order = parseInt(question.order);
    });

    $scope.exploration.questions.sort(function(a,b) {return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);} );

    angular.forEach($scope.exploration.questions, function(question, index) {
      if (question.answer == '' && $scope.slides.index === 0 && !$scope.slides.keepFirst) {
        if (index === 0) {
          $scope.slides.keepFirst = true;
        }
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

    $scope.markAsCompleted = function(id) {
      if ($scope.slides.completed.indexOf(id) === -1) {
        $scope.slides.completed.push(id);
      }
    };

  }

  module.exports = [
    '$scope',
    '$ionicSlideBoxDelegate',
    ExplorationQuestionsController
  ];
}())
