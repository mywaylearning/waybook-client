(function() {
  'use strict';

  function ExplorationQuestionController($scope, $timeout) {

    $scope.icon = 'ion-load-c spin';

    $scope.answered = function(answer) {
      $timeout(function() {
        $scope.icon = 'ion-checkmark';
        $scope.onAnswer();
        console.log($scope.question);
      }, 1000);
    };
  }

  module.exports = [
    '$scope',
    '$timeout',
    ExplorationQuestionController
  ];
}())
