(function() {
  'use strict';

  function ExplorationQuestionController($scope, $timeout) {

    $scope.viewData = {
      disableAnswers: false,
      question: $scope.question,
      answers: $scope.answers || $scope.question.answers
    };

    $scope.model = {
      question: $scope.question.order,
      answer: null
    };

    $scope.answered = function(answer) {
      $scope.viewData.icon = 'ion-load-c spin';
      $scope.viewData.disableAnswers = true;

      console.log('Saving', $scope.model);
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
