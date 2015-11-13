(function() {

  'use strict';

  function HelpOverlayController($scope, $state, $stateParams, $ionicTemplateLoader, store) {

    $scope.preventHelp = false;

    if (!$scope.helpHtml) {
      $scope.preventHelp = true;
    }

    var storeKey = 'way.help.' + $state.current.name;

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

      var firstTime = !store.get(storeKey);

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

  module.exports = ['$scope', '$state', '$stateParams', '$ionicTemplateLoader', 'store', HelpOverlayController];

}());
