/* eslint angular/on-watch: 0 */
function GrantRun($timeout, $rootScope, $state, $stateParams, UserService, auth, ERROR) {
  'ngInject';

  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
    if (auth.isAuthenticated()) {
      UserService.currentUser().then(function(user) {
        if (!user.birthDate) {
          event.preventDefault();
          $timeout(function() {
            $state.go('app.me.account', {
              ageRequired: true
            });
          });
        }
      });
    }

    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;
  });

  function onStateChangeError(evt, toState, toParams, fromState, fromParams, error) {
    if (error && error.type === ERROR.grantRejected) {
      if (error.stateTo === fromState) {
        evt.preventDefault();
      }
    }

    if (error && error.type === ERROR.unauthorizedRequest) {
      auth.isAuthenticated(true).then(function(response) {
        if (response) {
          $state.go('app.unauthorized');
        } else {
          $state.go('public.login');
        }
      });
    }
  }

  $rootScope.$on('$stateChangeError', onStateChangeError);
}

module.exports = GrantRun;
