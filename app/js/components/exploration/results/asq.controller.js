(function() {
  'use strict';

  function AsqController($scope) {
    $scope.viewData = {
      score: $scope.results.score,
      min: $scope.results.min,
      max: $scope.results.max,
      label: 'your score'
    };
  }

  module.exports = [
    '$scope',
    AsqController
  ];
}())
