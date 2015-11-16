function RouterService($state, $stateParams, $location) {
  'ngInject';
  var service;

  function _clearParam(param) {
    $location.search(param, null);
  }

  /**
   * Redirect user to logged in state
   * @return {Promise} A promise representing the state of the new transition
   */
  function _goToLoggedIn() {
    return $state.go('app.main.home');
  }

  function _goToLoggedOut() {
    var stateTo = 'public.intro';

    if (stateTo === $state.current.name) {
      return $state.transitionTo(
        $state.current,
        $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        }
      );
    }

    return $state.go(stateTo, null, {
      reload: true
    });
  }


  function _goTo(stateName, params, noreload) {
    var paramsters = params;

    if (params === 'actuals') {
      paramsters = $stateParams;
    }
    return $state.transitionTo(stateName, paramsters, {
      reload: !noreload,
      inherit: false,
      notify: true
    });
  }

  function _getCurrentRoute() {
    return $state.current;
  }

  /**
   * Public
   */
  service = {
    goToLoggedIn: _goToLoggedIn,
    goToLoggedOut: _goToLoggedOut,
    getCurrentRoute: _getCurrentRoute,
    goTo: _goTo,
    clearParam: _clearParam
  };
  return service;
}

module.exports = RouterService;
