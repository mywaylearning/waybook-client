function WatsonDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/exploration/results/watson.html',
    controller: 'WatsonController',
    scope: {
      results: '=',
      exploration: '='
    }
  };
}

module.exports = WatsonDirective;
