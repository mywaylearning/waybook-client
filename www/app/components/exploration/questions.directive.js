(function() {
  'use strict';

  function ExplorationQuestionsDirective() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/questions.html',
      controller: 'ExplorationQuestionsController',
      scope: {
        questions: '='
      }
    }


  }


  module.exports = ExplorationQuestionsDirective;


}());
