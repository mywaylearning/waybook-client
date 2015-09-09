'use strict';

function MeController($scope, $stateParams, discoveries) {
  $scope.discoveries = discoveries;
}

MeController.$inject = ['$scope', '$stateParams', 'discoveries'];

module.exports = MeController;
