// based on https://github.com/Narzerus/angular-permission
// Maybe eventually add a provider where you can set grant groups
// so indstead of always having to do grant.only(['admin','user'])
// you'd do grant.group('loggedin').only();
//
// add constant with availble ROLE names
// ROLE.guest
// ROLE.user
// ROLE.admin etc..

// In this error handler is where will handle redirecting the user to the proper page
// The Role factory will have a provider that has a default redirect URL, this will be used when one is not provided with route
function GrantService($q) {
  'ngInject';
  var svcInterface;
  var _roles = [];

  /**
   * Private
   */

  function _hasRole(roleName) {
    var hasRole = _roles.some(function(role) {
      return (role.name === roleName);
    });

    return hasRole;
  }

  function _addRole(role) {
    if (_hasRole(role.name)) {
      throw new Error('GrantService: Unable to add role because "' + role.name + '" role already exists!');
    }

    _roles.push(role);
  }

  function authorize(whichRoles, states, resolveIfMatch, stateParams) {
    var matches = [];
    var stateTo;
    var deferred;
    var _states = angular.isArray(states) ? states : [states];
    var _whichRoles = angular.isArray(whichRoles) ? whichRoles : [whichRoles];

    // find the roles we are trying to authorize
    _roles.forEach(function(role, index) {
      _whichRoles.forEach(function(roleName) {
        if (roleName === role.name) {
          // if state params from the state were passed
          // make sure the role has access to them
          role.setStateParams(stateParams);

          // attempt to match this role with an accompanying
          // stateTo from the states array, if a match can not
          // be found default to the first stateTo in states
          stateTo = _states[index - 1] || _states[0];

          matches.push(role.validate(stateTo, resolveIfMatch));
        }
      });
    });

    deferred = $q.defer();
    $q.all(matches)
      .then(function(results) {
        deferred.resolve(results);
      })
      .catch(function(err) {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  function _only(roles, states, stateParams) {
    return authorize(roles, states, true, stateParams);
  }

  function _except(roles, states, stateParams) {
    return authorize(roles, states, false, stateParams);
  }

  /**
   * Public
   */
  svcInterface = {
    only: _only,
    except: _except,
    addRole: _addRole,
    hasRole: _hasRole
  };
  return svcInterface;
}

module.exports = GrantService;
