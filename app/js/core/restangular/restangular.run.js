/* eslint angular/on-watch: 0 */
function RestangularRun($rootScope, $state, $http, Restangular, auth, authStore, router, ERROR) {
  'ngInject';
  /**
   * Configure any request interceptors that we want to add to our
   * requests before sending to the API.
   *
   * see https://github.com/mgonto/restangular#addrequestinterceptor
   */
  Restangular.addRequestInterceptor(function(elem) {
    return elem;
  });

  /**
   * Configure custom error interceptors to handle any errors that
   * come back form the API.
   *
   * see https://github.com/mgonto/restangular#seterrorinterceptor
   */
  Restangular.setErrorInterceptor(function(response, deferred) {
    var stopErrorPropagation = false;

    switch (response.status) {
    case 401:
      handleUnauthorized(response, deferred);
      stopErrorPropagation = true;
      break;

    case 403:
      handleExpiredToken(response, deferred);
      stopErrorPropagation = true;
      break;

    case 422:
      // Usually errors of already existing records on database. Can to be addressed on controllers
      deferred.reject(response.data.error);
      stopErrorPropagation = true;
      break;

    case 400:
    case 409:
      handleKnownErrors(response, deferred);
      stopErrorPropagation = false;
      break;

    default:
      handleUnknownErrors(response, deferred);
      stopErrorPropagation = true;
      break;
    }

    return !stopErrorPropagation;
  });

  /**
   * This is called when a 401 unauthorized response
   * is returned from API. This will mimic a ui-router
   * state change event, which will then call user.logout()
   * @param  {object} response  Raw response from the server.
   * @param  {Promise} deferred
   */
  function handleUnauthorized() {
    var error;

    // create a custom ui-router error for 401 unauthorized
    error = {
      type: ERROR.unauthorizedRequest
    };

    // manually trigger ui-router state change event passing in custom error
    $rootScope.$broadcast('$stateChangeError', null, null, null, null, error);
  }

  /**
   * If an expired access token error is triggered this
   * will catch it and request a new access token using
   * the user's current refresh token. It will then repeat
   * the original call that triggered the 403 error.
   *
   * see https://github.com/mgonto/restangular#seterrorinterceptor
   */
  function handleExpiredToken(response, deferred) {
    /**
     * Remove auth information,
     * deferred request
     * go to login page
     */
    auth.destroy();
    deferred.reject(response.data);
    if (router.getCurrentRoute().name !== 'public.login') {
      router.goToLoggedOut();
    }

    return;


    // var restangularizedResponse;
    // var accessToken = authStore.getAccessToken();

    /**
     * If no accessToken, then reject handleExpiredToken, it hapens on invalid
     * user credentials
     */
    // if (!accessToken) {
    //   return deferred.reject(response.data);
    // }

    // auth.authRefresh().then(function() {

    //   var newAccessToken = authStore.getAccessToken();

    //   /**
    //    * We have to do this because we're using $http restangular request
    //    * interceptors won't be called. Udate the headers with the new access token
    //    */
    //   response.config.headers.Authorization = 'Bearer ' + newAccessToken;

    //   /**
    //    * Repeat the request and then call the handlers the usual way.
    //    */
    //   $http(response.config).then(function(httpResponse) {

    //     restangularizedResponse = Restangular.restangularizeElement(
    //       null, httpResponse.data, 'expiredToken'
    //     );

    //     deferred.resolve(restangularizedResponse);
    //   }).catch(deferred.reject);
    // });
  }

  function handleKnownErrors(response, deferred) {
    deferred.reject(response.data.error);
  }

  function handleUnknownErrors(response, deferred) {
    var error;
    var _error = response.data ? response.data.error : false;
    deferred.reject(_error);

    // TODO: Improve this error handler. Must change API as well
    if (_error.help && _error.help.indexOf('ibm') > -1) {
      return;
    }

    // create a custom ui-router error for 401 unauthorized
    error = {
      type: ERROR.unknown
    };

    // manually trigger ui-router state change event passing in custom error
    $rootScope.$broadcast('$stateChangeError', null, null, null, null, error);
  }
}

module.exports = RestangularRun;
