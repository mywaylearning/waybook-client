'use strict';

function RegisterController($scope, router, user, errorHandler) {

  $scope.register = {};

  /**
   * Handle register form submission and validation. Once the use has
   * successfully authenticated we will be redirec to appropriate page.
   */
  $scope.onRegister = function() {

    var model = {
      name: $scope.register.name,
      lastName: $scope.register.lastName,
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
        router.goTo('public.emailSent');
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
  RegisterController
];