(function() {
  'use strict';

  function ExplorationQuestionsController($scope) {
    angular.forEach($scope.exploration.questions, function(question) {
      question.order = parseInt(question.order);
    });

    $scope.exploration.answers.sort(function(a,b) {return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);} );
  }

  module.exports = [
    '$scope',
    ExplorationQuestionsController
  ];
}())
