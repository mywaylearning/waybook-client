/**
 * Basic logged in user role. To validate this role there
 * must be a valid access_token and user object.
 * @param  {factory} Role
 * @param  {service} auth
 * @param  {service} user
 * @param  {constant} ROLES
 * @return {Role}
 */
function init(Role, $rootScope, $timeout, $state, auth, UserService, ROLES) {
  'ngInject';

  function validate() {
    $rootScope.returnToState = $rootScope.toState;
    $rootScope.returnToStateParams = $rootScope.toStateParams;
    return auth.isAuthenticated(true)
              .then(function() {
                return UserService.getSelf();
              }).catch(function() {
                $timeout(function() {
                  $state.go('public.login');
                });
              });
  }

  return new Role(ROLES.user, validate);
}

module.exports = init;
