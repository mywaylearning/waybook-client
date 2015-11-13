(function() {

  'use strict';

  var debug = require('debug')('waybook:Role:guest.run');

  /**
   * A user that is not logged in is considered a guest.
   * A guest is considered to not have a valid access token.
   * @param  {factory} Role
   * @param  {service} auth
   * @param  {constant} ROLES
   * @return {Role}
   */
  function init(Role, $state, $timeout, auth, ROLES) {

    return new Role(ROLES.guest, validate);

    function validate() {
      var authenticated = auth.isAuthenticated();
      if (authenticated) {
        $timeout(function(){
          $state.go('app.main.home');
        });
      }
      return !authenticated;
    }
  }

  module.exports = ['Role', '$state', '$timeout', 'auth', 'ROLES', init];

}());
