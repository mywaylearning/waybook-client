function AppService($rootScope, UserService) {
  'ngInject';

  var service;
  var scope;

  /**
   * Private
   */
  // function _setCurrentCatalog(catalogObj) {
  //   scope.app.currentCatalog = catalogObj;
  //   $rootScope.$emit(EVENTS.catalogChanged);
  // }

  function _reset() {
    scope.app.user = {};
  }

  function _init($scope) {
    scope = $scope;
    _reset();
  }

  function _setUser() {
    scope.app.user = UserService.currentUser().$object;
  }

  function _getUser() {
    return scope.app.user;
  }

  /**
   * Public
   */

  service = {
    init: _init,
    setUser: _setUser,
    getUser: _getUser,
    reset: _reset
  };

  return service;
}

module.exports = AppService;
