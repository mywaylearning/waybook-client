'use strict';

function MeEditController($scope, $stateParams, user, utils) {
  $scope.user = user;

  $scope.ageRequired = $stateParams.ageRequired;

  $scope.accountData = {
    underAge: false,
    needParent: false
  };

  $scope.$watch('user.birth', function(birth) {
    console.log(birth)
    $scope.accountData.underAge = false;
    $scope.accountData.needParent = false;
    if (!birth) {
      return;
    }
    var age = utils.age(birth);


    if (age < 13) {
      return $scope.accountData.underAge = true;
    }

    if (age < 18) {
      $scope.user.parent = {};
      return $scope.accountData.needParent = true;
    }
    delete $scope.user.parent;

  });

  $scope.updateUser = function() {
    $scope.user.save().then(function(result) {
      console.log('saved');
    });
  }


}

MeEditController.$inject = ['$scope', '$stateParams', 'user', 'utils'];

module.exports = MeEditController;
