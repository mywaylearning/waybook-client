function SearchController($scope, $state, $stateParams, $ionicSideMenuDelegate, $ionicHistory, results) {
  'ngInject';

  $ionicSideMenuDelegate.toggleLeft(false);

  $scope.viewData = {
    title: 'Search'
  };

  $scope.search = {
    query: null
  };

  $scope.doSearch = function() {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.search', { query: $scope.search.query }, { reload: true });
  };


  if ($stateParams.query) {
    $scope.search.query = $stateParams.query;
    $scope.viewData.title = 'Searching "' + $scope.search.query + '"';
  }

  $scope.results = results;
}

module.exports = SearchController;
