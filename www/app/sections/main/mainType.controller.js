'use strict';

function MainTypeController($scope, type) {
  $scope.type = type;
}

module.exports = ['$scope', 'type', MainTypeController];
