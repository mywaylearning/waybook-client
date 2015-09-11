'use strict';

var RecoverPasswordController = function($scope, $state, $stateParams, user) {
  $scope.password = {};


  $scope.setNewPassword = function() {
    var model = {
      password: $scope.password.new,
      recoveryToken: $stateParams.token
    }

    user.setRecoveryPassword($scope.password.new, $stateParams.token).then(function(result) {
      $state.go('public.login');
    });

  }
};

module.exports = [
  '$scope',
  '$state',
  '$stateParams',
  'user',
  RecoverPasswordController
];
