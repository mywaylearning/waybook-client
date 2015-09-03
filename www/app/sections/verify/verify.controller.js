'use strict';

function VerifyController($scope, $state, user, errorHandler) {
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

  user
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
  'user',
  'errorHandler',
  VerifyController
];
