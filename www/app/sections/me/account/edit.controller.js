'use strict';

function MeEditController($scope, $stateParams, currentUser, user, utils) {
  $scope.user = currentUser;

  $scope.ageRequired = $stateParams.ageRequired;

  $scope.accountData = {
    underAge: false,
    needParent: false
  };

  $scope.$watch('user.birth', function(birth) {
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
    user.updateSelf($scope.user).then(function(response) {
      console.log(response);
    });

    // $scope.user.save().then(function(result) {
    //
    //   console.log('saved');
    // });
  }


}

MeEditController.$inject = ['$scope', '$stateParams', 'currentUser', 'user', 'utils'];

module.exports = MeEditController;
