/**
 * A user that is not logged in is considered a guest.
 * A guest is considered to not have a valid access token.
 * @param  {factory} Role
 * @param  {service} auth
 * @param  {constant} ROLES
 * @return {Role}
 */
function init(Role, $state, $timeout, auth, ROLES) {
  'ngInject';

  function validate() {
    var authenticated = auth.isAuthenticated();
    if (authenticated) {
      $timeout(function() {
        $state.go('app.main.home');
      });
    }
    return !authenticated;
  }

  return new Role(ROLES.guest, validate);
}

module.exports = init;
