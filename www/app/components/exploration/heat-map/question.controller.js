(function() {
  'use strict';

  function ExplorationQuestionHeatMapController($scope) {
    console.log($scope.answers);

    angular.forEach($scope.answers, function(answer) {
      switch (answer.value) {
        case 1:
          answer.class = 'light'
          break;
        case 2:
          answer.class = 'positive'
          break;
        case 3:
          answer.class = 'calm'
          break;
        case 4:
          answer.class = 'energized'
          break;
        case 5:
          answer.class = 'assertive'
          break;
      }
    });

    var currentIndex = 0;

    $scope.answer = $scope.answers[currentIndex];

    $scope.setAnswer = function(index) {
      $scope.answer = $scope.answers[index];
      $scope.$apply();
    };

    $scope.onClick = function() {
      var maxIndex = Object.keys($scope.answers).length - 1;

      if (currentIndex === maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }

      $scope.setAnswer(currentIndex);
    };
  }

  module.exports = [
    '$scope',
    ExplorationQuestionHeatMapController
  ];
}())
