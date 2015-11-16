function HelpOverlayController($scope, $state, $stateParams, $ionicTemplateLoader, $ionicSlideBoxDelegate, store) {
  'ngInject';

  var storeKey = 'way.help.' + $state.current.name;
  var firstTime;

  $scope.preventHelp = false;

  if (!$scope.helpHtml) {
    $scope.preventHelp = true;
  }

  if ($stateParams.type) {
    storeKey = storeKey + '.' + $stateParams.type;
  }

  firstTime = !store.get(storeKey);

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
      $ionicSlideBoxDelegate.slide(0);
      showHelp();
    });
  }

  $scope.nextSlide = function(event) {
    event.stopPropagation();
    $ionicSlideBoxDelegate.next();
  };
}

module.exports = HelpOverlayController;
