function MeController($scope, $state, discoveries) {
  'ngInject';

  var onCreateDiscovery = function() {
    $state.go('app.me.discoveries');
  };

  $scope.discoveries = discoveries;

  $scope.createDiscovery = function() {
    $state.go('app.main.type', { type: 'discovery', onCreate: onCreateDiscovery });
  };
}

module.exports = MeController;
