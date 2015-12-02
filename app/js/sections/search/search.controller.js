function SearchController($scope, $state, $stateParams, $ionicSideMenuDelegate, $ionicHistory, results, TagService) {
  'ngInject';

  $ionicSideMenuDelegate.toggleLeft(false);

  $scope.viewData = {
    title: 'Search',
    results: results
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

  // Search for tags on API based on user input
  $scope.searchTag = function(term) {
    if (!term.length) {
      return;
    }
    TagService.collection(term).then(function(response) {
      var count = 0;
      $scope.tagsView = [];
      angular.forEach(response, function(tag) {
        if (count > 10) {
          return;
        }
        if (tag.text) {
          $scope.tagsView.push(tag);
          count++;
        }
      });
    });
  };

  // Add tag to textarea with the #
  $scope.getTagText = function(item) {
    return '#' + item.text;
  };


  if ($stateParams.query) {
    $scope.search.query = $stateParams.query;
    $scope.viewData.title = 'Searching "' + $scope.search.query + '"';
  }
}

module.exports = SearchController;
