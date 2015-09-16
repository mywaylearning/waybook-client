(function() {
  'use strict';

  function ExplorationQuestionController($scope, $timeout) {

    $scope.viewData = {
      icon: 'ion-load-c spin',
      disableAnswers: false,
      question: angular.isObject($scope.question) ? $scope.question.question : $scope.question,
      answers: $scope.answers || $scope.question.answers
    };

    $scope.model = {
      questionId: angular.isObject($scope.question) ? $scope.question.id : $scope.questionId,
      answer: null
    };

    $scope.answered = function(answer) {
      $scope.viewData.disableAnswers = true;
      $timeout(function() {
        $scope.viewData.icon = 'ion-checkmark';
        $scope.viewData.disableAnswers = false;

        $scope.onAnswer();
      }, 1000);
    };
  }

  module.exports = [
    '$scope',
    '$timeout',
    ExplorationQuestionController
  ];
}())
