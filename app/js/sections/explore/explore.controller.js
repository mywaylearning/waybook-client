function DiscoveryController($scope, $stateParams, categories) {
  'ngInject';

  var _categories = categories.plain();

  if ($stateParams.categoryOpen) {
    angular.forEach(_categories, function(category) {
      if (category.category.toLowerCase().indexOf($stateParams.categoryOpen.toLowerCase()) > -1) {
        category.shown = true;
      }
    });
  }

  $scope.viewData = {
    categories: _categories
  };
}

module.exports = DiscoveryController;
