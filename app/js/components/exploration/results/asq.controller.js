function AsqController($scope) {
  'ngInject';
  $scope.viewData = {
    score: $scope.results.score,
    min: $scope.results.min,
    max: $scope.results.max,
    label: 'your score'
  };
}

module.exports = AsqController;
