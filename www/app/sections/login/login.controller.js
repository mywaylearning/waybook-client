'use strict';

var LoginController = function($scope, $state, $ionicPopup, router, auth, user, errorHandler) {

  hello.init({
    facebook: process.env.FACEBOOK_CLIENT_ID,
    access_token: ''
  }, {
    redirect_uri: '',
    oauth_proxy: 'https://auth-server.herokuapp.com/proxy',
    scope: 'publish_actions,email',
    oauth_version: '1.0a',
  });

  /**
   * https://github.com/MrSwitch/hello.js#4-add-listeners-for-the-user-login
   */
  hello.on('auth.login', function(auth) {

    // Call user information, for the given network
    hello(auth.network).api('/me').then(function(response) {
      if (auth.network === 'facebook') {
        // TODO: Get required info from FB
      }
    });
  });

  $scope.facebook = function(){
    hello('facebook').login({scope: 'email'});
  };

  $scope.loginData = {};
  $scope.errorsData = {};

  /**
   * Handle login form submission and validation. Once the use has successfully
   * authenticated they will be redirected to appropriate page.
   */
  $scope.doLogin = function(form) {

    if (form.$invalid) {
      if (!form.$error.invalid_grant) {
        return;
      }
    }



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

  $scope.recoverPasswordData = {
    recoverEmail: '',
    emailSent: false
  };

  $scope.$watch('loginData.email', function(email) {
    $scope.recoverPasswordData.recoverEmail = email;
  });

  $scope.recoverPassword = function() {

    var recoverPopup = $ionicPopup.show({
      template: '<input type="email" ng-model="recoverPasswordData.recoverEmail">',
      title: 'Enter your e-mail',
      subTitle: 'You will receive an e-mail with instructions.',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Send</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.recoverPasswordData.recoverEmail) {
              //don't allow the user to close unless he enters an e-mail
              e.preventDefault();
            } else {
              return $scope.recoverPasswordData.recoverEmail;
            }
          }
        }
      ]
    });
    recoverPopup.then(function(email) {
      if (email) {
        user.recoverPasswordRequest(email).then(function(response) {
          $ionicPopup.show({
            title: 'E-mail sent',
            subTitle: 'We sent an e-mail to <strong>' + email + '</strong>. Please follow the instructions there to set a new password.',
            buttons: [
              { text: 'Ok' }
            ]
          });
        });
      }
    });
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
      user.logout(false);
      return $scope.errorsData.message = 'You need to verify your account';
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

  };

  /**
   * Handle invalid credentials or token expiration errors
   */
  var handleError = function(error) {
    /**
     * Clean auth data stored
     */
    auth.destroy();
    var _errorHandler = errorHandler.getInstance($scope);

    _errorHandler.setFormController($scope.$$childHead.loginForm);
    _errorHandler.handle(error);
  };

};

module.exports = [
  '$scope',
  '$state',
  '$ionicPopup',
  'router',
  'auth',
  'user',
  'errorHandler',
  LoginController
];
