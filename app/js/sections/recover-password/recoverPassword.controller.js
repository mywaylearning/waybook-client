var RecoverPasswordController = function($scope, $state, $stateParams, UserService) {
  'ngInject';
  $scope.password = {};

  $scope.setNewPassword = function() {
    UserService.setRecoveryPassword($scope.password.new, $stateParams.token).then(function() {
      $state.go('public.login');
    });
  };
};

module.exports = RecoverPasswordController;
