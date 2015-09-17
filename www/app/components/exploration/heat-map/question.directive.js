(function() {
  'use strict';

  function ExplorationQuestionHeatMapDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/exploration/heat-map/question.html',
      controller: 'ExplorationQuestionHeatMapController',
      scope: {
        answers: '=',
        question: '=',
        questionId: '@'
      },
      link: function(scope, el, attrs) {
        el.on('click', function() {
          scope.onClick();
        });
      }
    }
  }

  module.exports = ExplorationQuestionHeatMapDirective;
}());
