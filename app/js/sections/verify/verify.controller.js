function VerifyController($scope, $state, UserService) {
  var token = location.hash.split('t=');
  var model = {
    verify: token[1]
  };

  if (!token[1]) {
    return $state.go('^');
  }

  $scope.data = {
    isLoading: true
  };

  UserService
    .register(model)
    .then(function() {
      $scope.data.verified = true;
    })
    .catch(function() {
      $scope.data.verified = false;
    })
    .finally(function() {
      $scope.data.isLoading = false;
    });
}

module.exports = VerifyController;
