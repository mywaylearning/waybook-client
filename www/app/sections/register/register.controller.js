'use strict';

function RegisterController($scope, router, user, errorHandler, $ionicPopup) {

  $scope.register = {};

  // Creates a modal instance in case of registration is successfull
  var emailSent = function() {
    $ionicPopup.alert({
      title: 'Verification email sent',
      subTitle: 'An email has been sent to your inbox. Please check your email and click on the link to verify your account.',
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
        emailSent();
      })
      .catch(function(error) {
        console.log('on error', error);
      });
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
