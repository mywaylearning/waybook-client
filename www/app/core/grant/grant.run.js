(function() {

  'use strict';
  var debug = require('debug')('waybook:GrantRun');
  function GrantRun($timeout, $rootScope, $state, $stateParams, user, auth, ERROR) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState) {
      console.log('stateChangeStart', toState);

      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      if (user.isUserResolved()) {
        auth.authorize();
      }
    });



    $rootScope.$on('$stateChangeError', onStateChangeError);

    function onStateChangeError(evt, toState, toParams, fromState, fromParams, error) {

      if (error && error.type === ERROR.grantRejected) {
        debug('YOU SHALL NOT PASS!!!', error);
        debug(fromState);

        if (error.stateTo === fromState) {
          evt.preventDefault();
        }

        $state.go(fromState.name, fromParams);
      }

      if (error && error.type === ERROR.unauthorizedRequest) {
        auth.isAuthenticated(true).then(function(response){
          if (response) {
            user.logout();
          }
        });
      }
    }
  }

  module.exports = ['$timeout', '$rootScope', '$state', '$stateParams', 'user', 'auth', 'ERROR', GrantRun];

}());
