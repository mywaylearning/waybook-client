(function() {
  'use strict';

  function ExplorationQuestionsDirective() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/question-answer/questions.html',
      controller: 'ExplorationQuestionsQAController',
      scope: {
        exploration: '='
      }
    }


  }


  module.exports = ExplorationQuestionsDirective;


}());
