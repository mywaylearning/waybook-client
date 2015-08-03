'use strict';

function IntroController($scope, $state, $ionicSlideBoxDelegate, store, LOCAL_STORAGE_KEYS) {

  var key = LOCAL_STORAGE_KEYS.introSeen;

  $scope.startApp = function() {
    store.set(key, true);
    return $state.go('public.login');
  };

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
}

module.exports = [
  '$scope', '$state', '$ionicSlideBoxDelegate', 'store', 'LOCAL_STORAGE_KEYS',
  IntroController
];