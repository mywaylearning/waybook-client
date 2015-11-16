function MainTypeController($scope, $stateParams, type) {
  'ngInject';
  $scope.type = type;
  $scope.deadline = $stateParams.deadline;
  $scope.onCreate = $stateParams.onCreate;

  if (type !== 'thought') {
    $scope.helpHtml = 'sections/main/help-' + type + '.html';
  }
}

module.exports = MainTypeController;
