function ExplorationQuestionsDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/exploration/heat-map/questions.html',
    controller: 'ExplorationQuestionsHeatMapController',
    scope: {
      exploration: '='
    }
  };
}

module.exports = ExplorationQuestionsDirective;
