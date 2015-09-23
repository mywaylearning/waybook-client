(function() {
  'use strict';

  function ExplorationQuestionController($scope, $timeout, ExplorationService) {

    $scope.viewData = {
      disableAnswers: false,
      question: $scope.question,
      answers: $scope.exploration.answers || $scope.question.answers
    };


    $scope.model = {
      id: $scope.exploration.id,
      question: $scope.question.order,
      answer: null
    };

    if ($scope.question.answer) {
      $scope.model.answer = $scope.question.answer;
      $scope.viewData.icon = 'ion-checkmark';
    }

    $scope.answered = function(answer) {
      $scope.viewData.icon = 'ion-load-c spin';
      $scope.viewData.disableAnswers = true;

      $scope.model.answer = answer.order;

      console.log('Saving', model);

      ExplorationService.answerExplorationQuestion($scope.model).then(function() {
        $scope.viewData.icon = 'ion-checkmark';
        $scope.viewData.disableAnswers = false;
        $scope.onAnswer();
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
