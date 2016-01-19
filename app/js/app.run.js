/* globals StatusBar */
/* eslint angular/on-watch: 0 */

function AppRun($rootScope, $window, $timeout, $ionicPlatform, $ionicLoading, QuotesService) {
  'ngInject';
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // $rootScope.$on('$stateNotFound', function(evt, unfoundState, fromState, fromParams) {
    //   debug(unfoundState.to);
    //   debug(unfoundState.toParams);
    //   debug(unfoundState.options);
    // });
    //
    $rootScope.$on('$stateChangeStart', function(evt, toState) {
      console.log(toState.name);
      if (toState.name.indexOf('public') === -1) {
        $ionicLoading.show({
          template: '<div class="quotes"><div class="loading-text">Loading</div><div class="quote">' + QuotesService.getQuote() + '</div></div>'
        });
        $rootScope.loadingStart = new Date();
      }
      // debug('$stateChangeStart');
      // debug(toState);
      // debug(toParams);
      // debug(fromState);
      // debug(fromParams);
    });
    //
    // $rootScope.$on('$stateChangeError', function(evt, toState, toParams, fromState, fromParams, error) {
    //   debug('$stateChangeError');
    //   debug(toState);
    //   debug(toParams);
    //   debug(fromState);
    //   debug(fromParams);
    //   debug(error);
    // });
    //
    $rootScope.$on('$stateChangeSuccess', function() {
      var now = new Date();
      var remaining;
      if ($rootScope.loadingStart) {
        remaining = 2000 - (now - $rootScope.loadingStart);
        $timeout(function() {
          $ionicLoading.hide();
        }, remaining);
      }
      // debug('$stateChangeSuccess');
      // debug(toState);
      // debug(toParams);
      // debug(fromState);
      // debug(fromParams);
    });
    //
    // $rootScope.$on('$stateChangeSuccess', function(evt, toState, toParams, fromState) {
    //   $window.scrollTo(0, 0);
    //   if (toState.data) {
    //
    //   } else {
    //     $rootScope.bodyClass = false;
    //   }
    // });
  });
}

module.exports = AppRun;
