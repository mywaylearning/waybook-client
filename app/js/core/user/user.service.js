/* globals hello */
function UserService(api, auth, router, utils, EVENTS, API_URL) {
  'ngInject';

  var Users;
  var User;
  var userObj;
  var userRequest;

  Users = api.all('users');
  User = api.one('user');

  userObj = undefined;
  userRequest = null;

  /**
   * Clear all references to Restangular user elements
   * used during get user calls.
   */
  function getUserComplete() {
    userRequest = null;
  }

  /**
   * Store user information in userObj
   */
  function setUser(user) {
    userObj = user;
  }

  /**
   * Get the authenticated user's information.
   * if userObj already exists mimic restangular promise and resolve with userObj
   * @param  {Boolean} forceRefresh if true will force a fresh get user API call.
   * @return {Promise}
   */
  function _getSelf(forceRefresh) {
    if (userObj && !forceRefresh) {
      return utils.promisify(userObj);
    }

    if (userRequest) {
      return userRequest;
    }

    userRequest = User.customGET();
    userRequest.then(setUser).finally(getUserComplete);

    return userRequest;
  }

  /**
   * Helper method to retreive logged in user's information.
   * Will first check to see that user is authenticated before
   * trying to retreive the user object from API.
   *
   * @return {mixed} -  empty object if unautenticated

   *                    Promise if authenticated
   */
  function _currentUser(forceRefresh) {
    return auth.isAuthenticated() ? _getSelf(forceRefresh) : {};
  }

  function _userIsResolved() {
    return angular.isDefined(userObj);
  }

  /**
   * Will update the current user's info by
   * making a PUT call to user API endpoint.
   * @param  {Object} updates params to be updated.
   * @return {Promise}
   */
  function _updateSelf(updates) {
    var updateRequest;

    updateRequest = User.customPUT(updates);
    updateRequest.then(setUser);

    return updateRequest;
  }

  function _getUploadImageUrl() {
    return API_URL + '/user/image/upload';
  }

  /**
   * Get public profile for user matching username.
   * @param  {String} username
   * @return {Promise}
   */
  function _getByUsername(username) {
    return api.oneUrl('user', API_URL + '/profile/user/' + username).get();
  }

  /**
   * Create a new user
   * @param  {Object} user
   * @return {Promise}
   */
  function _register(user) {
    return Users.post(user);
  }

  /**
   * Start proccess of password recovering
   * @param  {String} email
   * @return {Promise}
   */
  function _recoverPasswordRequest(data) {
    return Users.post({
      recovery: data.recoverEmail,
      reCaptcha: data.reCaptcha
    });
  }

  /**
   * Set new password from recovery
   * @param  {String} email,
   * @param  {String} token
   * @return {Promise}
   */
  function _setRecoveryPassword(password, token) {
    return Users.post({
      password: password,
      recoveryToken: token
    });
  }

  /**
   * Logout out the authenticated user.
   * Will delete the access token, user info,
   * and redirect to logged out page.
   */
  function _logout(redirect) {
    var _redirect = angular.isUndefined(redirect) ? true : redirect;

    hello('facebook').logout();
    hello('google').logout();
    auth.destroy();
    userObj = undefined;
    userRequest = null;


    if (_redirect) {
      router.goToLoggedOut();
      window.location.reload();
    }
  }

  /**
   * Based on social login response, check if a user exists
   */
  function _socialLoginCheck(user) {
    return Users.post(user);
  }

  /**
   * Public
   */
  return {
    register: _register,
    recoverPasswordRequest: _recoverPasswordRequest,
    setRecoveryPassword: _setRecoveryPassword,
    currentUser: _currentUser,
    isUserResolved: _userIsResolved,
    getByUsername: _getByUsername,
    getUploadImageUrl: _getUploadImageUrl,
    getSelf: _getSelf,
    updateSelf: _updateSelf,
    logout: _logout,
    socialLoginCheck: _socialLoginCheck
  };
}

module.exports = UserService;
