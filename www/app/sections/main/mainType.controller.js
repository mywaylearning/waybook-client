'use strict';

function MainTypeController($scope, $stateParams, type) {
  $scope.type = type;
  $scope.deadline = $stateParams.deadline;
  $scope.onCreate = $stateParams.onCreate;

  if (type !== 'thought') {
    $scope.helpHtml = 'app/sections/main/help-'+ type +'.html';
  }
}

module.exports = ['$scope', '$stateParams', 'type', MainTypeController];
