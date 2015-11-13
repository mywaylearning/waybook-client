(function() {

  'use strict';
  var debug = require('debug')('waybook:GrantRun');
  function GrantRun($timeout, $rootScope, $state, $stateParams, UserService, auth, ERROR) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState) {
      if (auth.isAuthenticated()) {
        UserService.currentUser().then(function(user) {
          if (!user.birthDate) {
            event.preventDefault();
            $timeout(function() {
              $state.go('app.me.account', {ageRequired: true});
            });
          }
        });
      }

      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;
    });



    $rootScope.$on('$stateChangeError', onStateChangeError);

    function onStateChangeError(evt, toState, toParams, fromState, fromParams, error) {

      if (error && error.type === ERROR.grantRejected) {
        debug('YOU SHALL NOT PASS!!!', error);
        debug(fromState);

        if (error.stateTo === fromState) {
          evt.preventDefault();
        }

        // $state.go(fromState.name, fromParams);
      }

      if (error && error.type === ERROR.unauthorizedRequest) {
        auth.isAuthenticated(true).then(function(response){
          if (response) {
            UserService.logout();
          }
        });
      }
    }
  }

  module.exports = ['$timeout', '$rootScope', '$state', '$stateParams', 'UserService', 'auth', 'ERROR', GrantRun];

}());
