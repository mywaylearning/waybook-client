/* globals StatusBar */
/* eslint angular/on-watch: 0 */

function AppRun($rootScope, $window, $timeout, $ionicPlatform, $ionicLoading, $location, QuotesService, STATE_LOADING) {
  'ngInject';
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on('$stateChangeStart', function(evt, toState) {
      if (toState.loading) {
        $ionicLoading.show({
          template: '<div class="quotes"><div class="loading-text"><ion-spinner icon="spiral" class="spinner-positive"></ion-spinner></div><div class="quote">' + QuotesService.getQuote() + '</div></div>'
        });
        $rootScope.loadingStart = new Date();
      }
    });

    $rootScope.$on('$stateChangeSuccess', function() {
      var now = new Date();
      var remaining;
      if ($rootScope.loadingStart) {
        remaining = STATE_LOADING.timeout - (now - $rootScope.loadingStart);
        $timeout(function() {
          $ionicLoading.hide();
        }, remaining);
      }
    });
  });
}

module.exports = AppRun;
