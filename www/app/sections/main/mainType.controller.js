'use strict';

function MainTypeController($scope, $stateParams, type) {
  $scope.type = type;
  $scope.deadline = $stateParams.deadline;
  $scope.onCreate = $stateParams.onCreate;
}

module.exports = ['$scope', '$stateParams', 'type', MainTypeController];
