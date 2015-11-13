(function() {
  'use strict';

  function ExplorationQuestionsDirective() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/heat-map/questions.html',
      controller: 'ExplorationQuestionsHeatMapController',
      scope: {
        exploration: '='
      }
    }


  }


  module.exports = ExplorationQuestionsDirective;


}());
