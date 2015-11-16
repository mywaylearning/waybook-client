function ExplorationController($scope, exploration) {
  'ngInject';

  $scope.viewData = {
    exploration: exploration
  };
}

module.exports = ExplorationController;
