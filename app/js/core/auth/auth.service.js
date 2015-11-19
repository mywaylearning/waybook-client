function AuthService($timeout, $rootScope, $state, $location, $q, Restangular, authStore) {
  'ngInject';

  var svcInterface;
  var Oauth = Restangular.all('login');
  var Refresh = Restangular.all('refresh');
  var token = authStore.getAccessToken();
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  var oauthToken = null;

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  function param(obj) {
    var query = '';
    var name;
    var value;
    var fullSubName;
    var subName;
    var subValue;
    var innerObj;
    var i;

    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            if (value.hasOwnProperty(subName)) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
        } else if (angular.isDefined(value) && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  }

  /**
   * Upon successful authentication save the access_token
   * and refresh_token for this user in local storage.
   * @param  {Object} data - response object from the auth endpoint
   */
  function saveAuth(data) {
    authStore.save({
      access_token: data.access_token,
      refresh_token: data.refresh_token
    });

    token = authStore.getAccessToken();
  }

  /**
   * Clear all references to Restangular auth elements
   * used during authenticate and refresh calls.
   */
  function authComplete() {
    oauthToken = null;
  }

  function _authenticate(username, password) {
    var data;

    if (oauthToken) {
      return oauthToken;
    }

    data = param({
      username: username,
      password: password,
      grant_type: 'password',
      scope: 'full'
    });

    oauthToken = Oauth
      .post(data, null, headers)
      .then(saveAuth)
      .finally(authComplete);

    return oauthToken;
  }


  function _authRefresh() {
    var data;

    if (oauthToken) {
      return oauthToken;
    }

    data = param({
      grant_type: 'refresh_token',
      refresh_token: authStore.getRefreshToken(),
      scope: 'full'
    });

    oauthToken = Refresh.post(data, null, headers);
    /**
     * If we get to this point, access token has expired, and we are going to
     * use refresh token to get new access token, so, remove invalid data
     * stored on authStore
     */
    authStore.destroy();
    return oauthToken.then(saveAuth).finally(authComplete);
  }

  /**
   * This will return true or false depending on whether a valid access token
   * exists.
   *
   * If promisify is true a promise object will be returned that will resolve
   * if token exists and reject if it doesn't.
   *
     Usage:

     if (auth.isAuthenticated()) {}

     // promisify true
     auth.isAuthenticated(true).then()

   * @param  {Boolean}  promisify If true will return a promise
   * @return {mixed}              Can return Boolean or Promise
   */
  function _isAuthenticated(promisify) {
    var deferred;
    if (angular.isUndefined(promisify) || !promisify) {
      return angular.isDefined(token);
    }
    deferred = $q.defer();

    if (angular.isDefined(token)) {
      deferred.resolve(token);
    } else {
      deferred.resolve(false);
    }

    return deferred.promise;
  }

  /**
   * Will delete any information stored in local storage
   * in relation to auth for this user. e.g. access_token
   */
  function _destroy() {
    token = undefined;
    authStore.destroy();
  }

  /**
   * Generate API auth header using current access_token
   * @return {Object}
   */
  function _getAuthHeader() {
    var header = {
      'Authorization': 'Bearer ' + authStore.getAccessToken()
    };
    return header;
  }

  svcInterface = {
    authenticate: _authenticate,
    saveAuth: saveAuth,
    authRefresh: _authRefresh,
    isAuthenticated: _isAuthenticated,
    destroy: _destroy,
    getAuthHeader: _getAuthHeader
  };

  return svcInterface;
}

module.exports = ['$timeout', '$rootScope', '$state', '$location', '$q', 'Restangular', 'authStore', AuthService];
