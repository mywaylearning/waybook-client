function RegisterController($scope, $stateParams, router, UserService, errorHandler, $ionicPopup, auth) {
  'ngInject';

  var formInstance;

  // Creates a modal instance in case of registration is successfull
  var emailSent = function(email) {
    $ionicPopup.alert({
      title: 'Verification email sent',
      subTitle: 'An email was sent to <strong>' + email + '</strong>. Please check your email and click on the link to verify your account.',
      okText: 'Ok'
    }).then(function() {
      router.goTo('public.login');
    });
  };

  /**
   * Handle invalid fields
   */
  var handleError = function(error) {
    var _errorHandler = errorHandler.getInstance($scope);

    _errorHandler.setFormController(formInstance);
    _errorHandler.handle(error);
  };

  if ($stateParams.userInfo) {
    $scope.model = $stateParams.userInfo;
  } else {
    $scope.model = {};
  }

  /**
   * Handle register form submission and validation. Once the use has
   * successfully authenticated we will be redirec to appropriate page.
   */
  $scope.onRegister = function(form) {
    formInstance = form;
    UserService
      .register($scope.model)
      .then(function(data) {
        if (data.access_token) {
          auth.saveAuth(data);
          window.location.reload(false);
        } else {
          emailSent(data.email);
        }
      })
      .catch(handleError);
  };
}

module.exports = RegisterController;
