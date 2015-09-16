(function() {
  'use strict';

  function ExplorationQuestionsDirective() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/multiple-choice/questions.html',
      controller: 'ExplorationQuestionsMultipleChoiceController',
      scope: {
        exploration: '='
      }
    }


  }


  module.exports = ExplorationQuestionsDirective;


}());
