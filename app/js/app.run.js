/* globals StatusBar */
/* eslint angular/on-watch: 0 */

function AppRun($rootScope, $ionicPlatform, $ionicLoading, QuotesService) {
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

    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState) {
      var template = '<ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>';

      if (fromState.name === 'public.login') {
        template = '<div class="quotes"><div class="loading-text"><ion-spinner icon="spiral" class="spinner-positive"></ion-spinner></div><div class="quote">' + QuotesService.getQuote() + '</div></div>';
      }

      if (toState.loading) {
        $ionicLoading.show({
          template: template,
          hideOnStateChange: true
        });
      }
    });
  });
}

module.exports = AppRun;
