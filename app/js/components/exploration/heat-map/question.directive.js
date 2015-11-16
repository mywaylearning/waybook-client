function ExplorationQuestionHeatMapDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/exploration/heat-map/question.html',
    controller: 'ExplorationQuestionHeatMapController',
    scope: {
      exploration: '=',
      question: '='
    },
    link: function(scope, el) {
      el.on('click', function() {
        scope.onClick();
      });
    }
  };
}

module.exports = ExplorationQuestionHeatMapDirective;
