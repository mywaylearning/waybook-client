(function() {
  'use strict';

  function ExplorationQuestionDirective() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/multiple-choice/question.html',
      controller: 'ExplorationQuestionMultipleChoiceController',
      scope: {
        questionId: '@',
        question: '=',
        answers: '=',
        onAnswer: '&'
      }
    }


  }


  module.exports = ExplorationQuestionDirective;


}());
