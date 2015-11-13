(function() {
  'use strict';

  function ExplorationQuestionDirective() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/question-answer/question.html',
      controller: 'ExplorationQuestionQAController',
      scope: {
        exploration: '=',
        question: '=',
        onAnswer: '&'
      }
    }


  }


  module.exports = ExplorationQuestionDirective;


}());
