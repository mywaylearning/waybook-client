'use strict';

function RegisterController($scope, router, user, errorHandler, $ionicModal) {

  $scope.register = {};
  $scope.successModal = {};

  // Creates a modal instance in case of registration is successfull
  $ionicModal.fromTemplateUrl('app/sections/register/register.emailSent.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.successModal = modal;
  });

  // Redirect user when click on the modal button
  $scope.goToLogin = function() {
    $scope.successModal.remove();
    router.goTo('public.login');
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.successModal.remove();
  });

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
        $scope.successModal.show();
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
  '$ionicModal',
  RegisterController
];
