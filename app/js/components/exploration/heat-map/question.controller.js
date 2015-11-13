(function() {
  'use strict';

  function ExplorationQuestionHeatMapController($scope, ExplorationService) {

    // Define current answer index
    var currentAnswerIndex = 0;

    // Loop default answers to perform some assignments and verifications
    angular.forEach($scope.exploration.answers, function(answer, index) {

      // Check if there is any user answer
      if ($scope.question.answer) {
        if ($scope.question.answer === answer.order) {
          currentAnswerIndex = index;
        }
      }

      // Assign class based on answer value
      switch (answer.order) {
        case '1':
          answer.class = 'dont-know';
          break;
        case '2':
          answer.class = 'must-have';
          break;
        case '3':
          answer.class = 'should-have';
          break;
        case '4':
          answer.class = 'nice-have';
          break;
        case '5':
          answer.class = 'avoid';
          break;
      }
    });

    // Set default answer based on currentIndex on first load
    $scope.answer = $scope.exploration.answers[currentAnswerIndex];

    // Define our default model
    var model = {
      id: $scope.exploration.id,
      question: $scope.question.order,
      answer: null
    };

    // Set a answer based on index
    $scope.setAnswer = function() {
      model.answer = $scope.exploration.answers[currentAnswerIndex].order;

      // Try to save model. If any error occours, decrement currentIndex
      ExplorationService.answerExplorationQuestion(model).then(function() {
        $scope.answer = $scope.exploration.answers[currentAnswerIndex];
      }).catch(function() {
        currentAnswerIndex--;
      });


    };

    // Handle click
    $scope.onClick = function() {
      var maxIndex = Object.keys($scope.exploration.answers).length - 1;

      if (currentAnswerIndex === maxIndex) {
        currentAnswerIndex = 0;
      } else {
        currentAnswerIndex++;
      }

      $scope.setAnswer(currentAnswerIndex);
    };
  }

  module.exports = [
    '$scope',
    'ExplorationService',
    ExplorationQuestionHeatMapController
  ];
}())
