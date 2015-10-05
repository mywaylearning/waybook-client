'use strict';

function RegisterController($scope, router, user, errorHandler, $ionicPopup) {

  $scope.register = {};

  // Creates a modal instance in case of registration is successfull
  var emailSent = function(email) {
    $ionicPopup.alert({
      title: 'Verification email sent',
      subTitle: 'An email was sent to <strong>'+ email +'</strong>. Please check your email and click on the link to verify your account.',
      okText: 'Ok',
    }).then(function() {
      router.goTo('public.login');
    });
  };

  /**
   * Handle register form submission and validation. Once the use has
   * successfully authenticated we will be redirec to appropriate page.
   */
  $scope.onRegister = function() {

    var model = {
      name: $scope.register.name,
      lastName: $scope.register.lastName,
      username: $scope.register.username,
      email: $scope.register.email,
      password: $scope.register.password
    };


    /**
     * Do nothing unless valid email and password content
     */
    if (!model.email || !model.password) {
      // TODO: Display error messages properly
      return;
    }

    user
      .register(model)
      .then(function(data) {
        emailSent(model.email);
      })
      .catch(handleError);
  };

  /**
   * Handle invalid fields
   */
  var handleError = function(error) {
    var _errorHandler = errorHandler.getInstance($scope);

    _errorHandler.setFormController($scope.$$childHead.registerForm);
    _errorHandler.handle(error);
  };
};

module.exports = [
  '$scope',
  'router',
  'user',
  'errorHandler',
  '$ionicPopup',
  RegisterController
];
