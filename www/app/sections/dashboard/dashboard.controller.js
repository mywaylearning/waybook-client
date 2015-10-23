'use strict';

function DashboardController($scope, $state, dashboardData) {
  $scope.viewData = dashboardData;
}

module.exports = ['$scope', '$state', 'dashboardData', DashboardController];
