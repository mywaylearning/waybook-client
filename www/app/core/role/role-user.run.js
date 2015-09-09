(function() {

  'use strict';

  var debug = require('debug')('waybook:Role:user.run');

  /**
   * Basic logged in user role. To validate this role there
   * must be a valid access_token and user object.
   * @param  {factory} Role
   * @param  {service} auth
   * @param  {service} user
   * @param  {constant} ROLES
   * @return {Role}
   */
  function init(Role, $rootScope, $timeout, $state, auth, user, ROLES) {

    return new Role(ROLES.user, validate);

    function validate() {
      debug('in validate');
      $rootScope.returnToState = $rootScope.toState;
      $rootScope.returnToStateParams = $rootScope.toStateParams;
      return auth.isAuthenticated(true)
                .then(function() {
                  return user.getSelf();
                }).catch(function(error) {
                  $timeout(function() {
                    $state.go('public.login');
                  });
                });
    }
  }

  module.exports = ['Role', '$rootScope', '$timeout', '$state', 'auth', 'user', 'ROLES', init];

}());
