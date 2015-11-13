'use strict';

function MeController($scope, $state, discoveries) {
  $scope.discoveries = discoveries;

  var onCreateDiscovery = function() {
    $state.go('app.me.discoveries');
  };

  $scope.createDiscovery = function() {
    $state.go('app.main.type', {type: 'discovery', onCreate: onCreateDiscovery});
  };
}

MeController.$inject = ['$scope', '$state', 'discoveries'];

module.exports = MeController;
