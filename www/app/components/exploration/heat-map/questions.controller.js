(function() {
  'use strict';

  function ExplorationQuestionsController($scope) {
    angular.forEach($scope.exploration.questions, function(question) {
      question.order = parseInt(question.order);
    });
  }

  module.exports = [
    '$scope',
    ExplorationQuestionsController
  ];
}())
