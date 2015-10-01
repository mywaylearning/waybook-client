(function() {
  'use strict';

  function AsqController($scope) {
    $scope.viewData = {
      score: $scope.results.score,
      min: 0,
      max: 50,
      label: 'your score'
    };
  }

  module.exports = [
    '$scope',
    AsqController
  ];
}())
