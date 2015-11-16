function MainTypeController($scope, $stateParams, type) {
  'ngInject';
  $scope.type = type;
  $scope.deadline = $stateParams.deadline;
  $scope.onCreate = $stateParams.onCreate;

  if (type !== 'thought') {
    $scope.helpHtml = 'sections/main/help-' + type + '.html';
  }

  $scope.hideButton = false;

  if (type === 'goal') {
    $scope.hideButton = true;
  }
}

module.exports = MainTypeController;
