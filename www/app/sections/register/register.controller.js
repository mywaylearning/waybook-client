'use strict';

function RegisterController($scope, router, user, errorHandler, $ionicModal) {

  $scope.register = {};

  // Creates a modal instance in case of registration is successfull
  $ionicModal.fromTemplateUrl('app/sections/register/register.emailSent.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Redirect user when click on the modal button
  $scope.goToLogin = function() {
    router.goTo('public.login');
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  /**
   * Handle register form submission and validation. Once the use has
   * successfully authenticated we will be redirec to appropriate page.
   */
  $scope.onRegister = function() {
    console.log('aqui2');

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
        $scope.modal.show();
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
