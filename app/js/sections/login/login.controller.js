var LoginController = function($scope, $state, $ionicPopup, router, auth, UserService, errorHandler, RECAPTCHA_KEY) {
  'ngInject';

  var _loginFormController;

  $scope.loginData = {};
  $scope.recoverMode = false;
  $scope.errorsData = {};

  /**
   * On successful user authentication make a call to get user object.
   * @return {Promise}
   */
  function onAuthenticated() {
    return UserService.getSelf();
  }

  /**
   * Once the user object has been received upate the AppController user object.
   * Then redirect to logged in state.
   */
  function onGetUserSuccess(userData) {
    if (userData.confirmationToken) {
      UserService.logout(false);
      $scope.errorsData.message = 'You need to verify your account';
      return;
    }
    $scope.errorsData = {};
    // $scope.loginData = {};
    $scope.app.user = userData;
    if ($scope.returnToState) {
      $state.go($scope.returnToState.name, $scope.returnToStateParams);
      $scope.returnToState = null;
      $scope.returnToStateParams = null;
    } else {
      router.goToLoggedIn();
    }
  }

  /**
   * Handle invalid credentials or token expiration errors
   */
  function handleError(error) {
    var _errorHandler = errorHandler.getInstance($scope);
    $scope.isSubmitting = false;
    /**
     * Clean auth data stored
     */
    auth.destroy();

    _errorHandler.setFormController(_loginFormController);
    _errorHandler.handle(error);
  }

  /**
   * Handle login form submission and validation. Once the use has successfully
   * authenticated they will be redirected to appropriate page.
   */
  $scope.doLogin = function(form) {
    var email = $scope.loginData.email;
    var password = $scope.loginData.password;

    _loginFormController = form;

    if (form.$invalid) {
      if (!form.$error.invalid_grant) {
        return;
      }
    }

    $scope.isSubmitting = true;

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

  $scope.recoverPasswordData = {
    recoverEmail: '',
    emailSent: false,
    reCaptcha: null
  };

  $scope.$watch('loginData.email', function(email) {
    $scope.recoverPasswordData.recoverEmail = email;
  });

  $scope.reCaptcha = {
    key: RECAPTCHA_KEY
  };

  $scope.setCaptchaResponse = function(response) {
    $scope.recoverPasswordData.reCaptcha = response;
  };

  $scope.setCaptchaWidgetId = function(widgetId) {
    $scope.reCaptcha.widget = widgetId;
  };

  $scope.cbCaptchaExpiration = function() {
    $scope.recoverPasswordData.reCaptcha = null;
  };

  $scope.setRecoverMode = function(mode) {
    $scope.recoverMode = mode;
  };

  $scope.recoverPassword = function() {
    UserService.recoverPasswordRequest($scope.recoverPasswordData).then(function() {
      $ionicPopup.show({
        title: 'E-mail sent',
        subTitle: 'We sent an e-mail to <strong>' + $scope.recoverPasswordData.recoverEmail + '</strong>. Please follow the instructions there to set a new password.',
        buttons: [{
          text: 'Ok',
          type: 'button-positive'
        }]
      }).then(function() {
        $scope.recoverMode = false;
      });
    });
  };
};

module.exports = LoginController;
