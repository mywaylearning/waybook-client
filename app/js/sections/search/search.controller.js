function SearchController($scope, results, $stateParams, $ionicSideMenuDelegate) {
  'ngInject';

  $ionicSideMenuDelegate.toggleLeft();

  $scope.viewData = {
    title: 'Search'
  };

  $scope.query = $stateParams.query;
  $scope.results = results;

  if ($scope.query) {
    $scope.viewData.title = 'Searching "' + $scope.query + '"';
  }
}

module.exports = SearchController;
