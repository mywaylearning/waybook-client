function MeEditController($scope, $stateParams, $state, currentUser, UserService, utils, USER_AGE, errorHandler) {
  'ngInject';

  // Form controllers
  var _basicFormController;
  var _passwordFormController;

  /**
   * Handle invalid fields on password form
   */
  function _passwordHandleError(error) {
    var _errorHandler = errorHandler.getInstance($scope);
    error.error = 'ValidationError';
    error.details = {
      messages: {
        password: ['The current password is wrong']
      }
    };
    _errorHandler.setFormController(_passwordFormController);
    _errorHandler.handle(error);
  }

  /**
   * Handle invalid fields on password form
   */
  function _basicHandleError(error) {
    var _errorHandler = errorHandler.getInstance($scope);

    _errorHandler.setFormController(_basicFormController);
    _errorHandler.handle(error);
  }

  function _updateSelf(model, _errorHandler) {
    UserService.updateSelf(model).then(function() {
      if ($scope.ageRequired) {
        return $state.go('app.main.home');
      }
      $state.transitionTo($state.current, {}, {
        reload: true
      });
    }).catch(_errorHandler);
  }

  currentUser.birthDate = currentUser.birthDate ? new Date(currentUser.birthDate) : null;
  currentUser.gender = !currentUser.gender ? '' : currentUser.gender;

  $scope.user = currentUser;
  $scope.password = {};

  $scope.ageRequired = $stateParams.ageRequired;

  $scope.accountData = {
    underAge: false,
    needParent: false
  };

  $scope.ageConfig = {
    titleLabel: 'Your date of birth',
    inputDate: currentUser.birthDate,
    showTodayButton: false,
    to: new Date(),
    callback: function(val) {
      if (val) {
        $scope.user.birthDate = val;
      }
    }
  };

  $scope.$watch('user.birthDate', function(birth) {
    var age = utils.age(birth);
    $scope.accountData.underAge = false;
    $scope.accountData.needParent = false;
    if (!birth) {
      return;
    }

    if (age < USER_AGE.minimumAge) {
      $scope.accountData.underAge = true;
      return;
    }

    if (age < USER_AGE.minimumParentAge) {
      $scope.accountData.needParent = true;
      return;
    }
  });

  $scope.updateBasics = function(formController) {
    var model = {
      firstName: $scope.user.firstName,
      lastName: $scope.user.lastName,
      username: $scope.user.username,
      postalCode: $scope.user.postalCode,
      gender: $scope.user.gender
    };

    _basicFormController = formController;

    _updateSelf(model, _basicHandleError);
  };

  $scope.updateAge = function() {
    var model = {
      birthDate: $scope.user.birthDate,
      parentFirstName: $scope.user.parentFirstName,
      parentLastName: $scope.user.parentLastName,
      parentEmail: $scope.user.parentEmail,
      parentPhone: $scope.user.parentPhone
    };

    _updateSelf(model);
  };

  $scope.updatePassword = function(formController) {
    var model = {
      password: $scope.password.current,
      newPassword: $scope.password.new,
      confirmPassword: $scope.password.confirm
    };

    _passwordFormController = formController;

    _updateSelf(model, _passwordHandleError);
  };
}

module.exports = MeEditController;
