'use strict';

function MeAgeController($scope, $stateParams, user, utils) {
  $scope.user = user;

  $scope.hideBackButton = $stateParams.hideBackButton;

  $scope.accountData = {
    underAge: false,
    needParent: false
  };

  $scope.$watch('user.birth', function(birth) {
    if (!birth) {
      return;
    }
    var age = utils.age(birth);
    $scope.accountData.underAge = false;
    $scope.accountData.needParent = false;

    if (age < 13) {
      return $scope.accountData.underAge = true;
    }

    if (age < 18) {
      $scope.user.guardian = {};
      return $scope.accountData.needParent = true;
    }
    delete $scope.user.guardian;

  });

  $scope.updateUser = function() {
    $scope.user.save().then(function(result) {
      console.log('saved');
    });
  }
}

MeAgeController.$inject = ['$scope', '$stateParams', 'user', 'utils'];

module.exports = MeAgeController;
