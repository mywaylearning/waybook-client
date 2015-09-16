(function() {
  'use strict';

  function ExplorationQuestionDirective() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/question.html',
      controller: 'ExplorationQuestionController',
      scope: {
        question: '=',
        onAnswer: '&'
      }
    }


  }


  module.exports = ExplorationQuestionDirective;


}());
