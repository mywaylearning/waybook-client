(function() {
  'use strict';

  function ExplorationQuestionsController($scope) {

    $scope.questions = $scope.exploration.questions;

    $scope.answers = $scope.exploration.answers;

  }

  module.exports = [
    '$scope',
    ExplorationQuestionsController
  ];
}())
