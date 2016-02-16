function AsqController() {
  return {
    restrict: 'E',
    templateUrl: 'components/exploration/results/asq.html',
    controller: 'AsqController',
    scope: {
      results: '=',
      exploration: '=',
      fromPost: '='
    }
  };
}


module.exports = AsqController;
