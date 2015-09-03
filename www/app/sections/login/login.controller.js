'use strict';

var LoginController = function($scope, $state, router, auth, user, errorHandler) {

  $scope.loginData = {};
  $scope.errorsData = {};

  /**
   * Handle login form submission and validation. Once the use has successfully
   * authenticated they will be redirected to appropriate page.
   */
  $scope.doLogin = function() {
    var email = $scope.loginData.email;
    var password = $scope.loginData.password;

    /**
     * Do nothing unless valid email and password content
     */
    if (!email || !password) {
      // TODO: Display error messages properly
      return;
    }


    /**
     * Authenticate user with provided credentials
     * Then, if success, get user information
     * If there's an error, handle it with corresponding handler
     */
    auth
      .authenticate(email.toLowerCase(), password)
      .then(onAuthenticated)
      .then(onGetUserSuccess)
      .catch(handleError);
  };

  /**
   * On successful user authentication make a call to get user object.
   * @return {Promise}
   */
  function onAuthenticated() {
    return user.getSelf();
  };

  /**
   * Once the user object has been received upate the AppController user object.
   * Then redirect to logged in state.
   */
  function onGetUserSuccess(userData) {
    if (userData.confirmationToken) {
      user.logout();
      return $scope.errorsData.message = 'You need to verify your account';
    }
    $scope.app.user = userData;
    if ($scope.returnToState) {
      $state.go($scope.returnToState.name, $scope.returnToStateParams);
      $state.returnToState = null;
      $state.returnToStateParams = null;
    } else {
      router.goToLoggedIn();
    }

  };

  /**
   * Handle invalid credentials or token expiration errors
   */
  var handleError = function(error) {
    /**
     * Clean auth data stored
     */
    auth.destroy();
    errorHandler.getInstance(this).handle(error);

    /**
     * Redirect to login page
     */
    $scope.errorsData.message = 'Invalid e-mail or password.';
  }.bind(this);

};

module.exports = [
  '$scope',
  '$state',
  'router',
  'auth',
  'user',
  'errorHandler',
  LoginController
];
