function HelpOverlayController($scope, $state, $stateParams, $ionicTemplateLoader, store) {
  'ngInject';

  var storeKey = 'way.help.' + $state.current.name;
  var firstTime = !store.get(storeKey);
  $scope.preventHelp = false;

  if (!$scope.helpHtml) {
    $scope.preventHelp = true;
  }

  if ($stateParams.type) {
    storeKey = storeKey + '.' + $stateParams.type;
  }

  function showHelp() {
    $scope.showHelp = true;
  }

  function hideHelp() {
    $scope.showHelp = false;
    $scope.$apply();
  }

  if (!$scope.preventHelp) {
    $scope.loadHelpPromise = $ionicTemplateLoader.load($scope.helpHtml);

    if (firstTime) {
      showHelp();
      store.set(storeKey, true);
    }

    $scope.hideHelp = function() {
      hideHelp();
    };

    $scope.$on('showHelp', function() {
      showHelp();
    });
  }
}

module.exports = HelpOverlayController;
