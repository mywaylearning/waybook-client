function AsqController($scope, $state, ExplorationService) {
  'ngInject';
  $scope.viewData = {
    score: $scope.results.score,
    min: $scope.results.min,
    max: $scope.results.max,
    label: 'your score'
  };

  $scope.postResult = function() {
    ExplorationService.createPostWithResults($scope.exploration).then(function() {
      $state.go('app.main.home');
    });
  };
}

module.exports = AsqController;
