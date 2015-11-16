function FeedController($scope, PostService) {
  'ngInject';

  $scope.refresh = function() {
    PostService.collection($scope.postType).then(function(posts) {
      $scope.posts = posts;
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
}

module.exports = FeedController;
