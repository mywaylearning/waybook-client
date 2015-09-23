(function() {
  'use strict';

  function ExplorationQuestionController($scope, $timeout, ExplorationService) {

    $scope.viewData = {
      disableAnswers: false,
      question: $scope.question,
      answers: $scope.exploration.answers || $scope.question.answers,
      error: null
    };


    $scope.model = {
      id: $scope.exploration.id,
      question: $scope.question.order,
      answer: false
    };

    if ($scope.question.answer) {
      $scope.model.answer = $scope.question.answer;
      $scope.viewData.icon = 'ion-checkmark';
    }

    $scope.answered = function(answer) {
      $scope.viewData.icon = 'ion-load-c spin';
      $scope.viewData.disableAnswers = true;

      $scope.model.answer = answer.order;

      ExplorationService.answerExplorationQuestion($scope.model).then(function() {
        $scope.viewData.error = null;
        $scope.viewData.icon = 'ion-checkmark';
        $scope.onAnswer();
      }).catch(function() {
        $scope.viewData.error = 'We couldn\'t save your answer. Please try again.';
        if ($scope.question.answer) {
          return $scope.model.answer = $scope.question.answer;
        }
        $scope.model.answer = false;
      }).finally(function() {
        if ($scope.question.answer) {
          $scope.viewData.icon = 'ion-checkmark';
        }
        $scope.viewData.disableAnswers = false;
      });
    };
  }

  module.exports = [
    '$scope',
    '$timeout',
    'ExplorationService',
    ExplorationQuestionController
  ];
}())
