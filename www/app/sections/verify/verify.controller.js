'use strict';

function VerifyController($scope, $state, UserService, errorHandler) {
  var token = location.hash.split('t=');

  if (!token[1]) {
    return $state.go('^');
  }

  $scope.data = {
    isLoading: true
  };

  var model = {
    verify: token[1]
  };

  UserService
    .register(model)
    .then(function(data) {
      $scope.data.verified = true;
    })
    .catch(function(error) {
      $scope.data.verified = false;
    })
    .finally(function() {
      $scope.data.isLoading = false;
    });
};

module.exports = [
  '$scope',
  '$state',
  'UserService',
  'errorHandler',
  VerifyController
];
