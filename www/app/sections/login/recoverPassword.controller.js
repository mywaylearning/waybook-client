'use strict';

var RecoverPasswordController = function($scope, $state, $stateParams, user) {
  $scope.password = {};


  $scope.setNewPassword = function() {
    var model = {
      password: $scope.password.new,
      recoveryToken: $stateParams.token
    }

    // Call API endpoint to change password

  }
};

module.exports = [
  '$scope',
  '$state',
  '$stateParams',
  'user',
  RecoverPasswordController
];
