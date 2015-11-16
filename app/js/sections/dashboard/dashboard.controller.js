function DashboardController($scope, $state, dashboardData) {
  'ngInject';

  $scope.viewData = dashboardData;
}

module.exports = DashboardController;
