function DashboardController($scope, $state, dashboardData) {
  'ngInject';

  $scope.viewData = dashboardData;

  $scope.viewData.questionsCompletedPercentage = (dashboardData.questionsCompleted / dashboardData.questions * 100).toFixed(0) + '%';
}

module.exports = DashboardController;
