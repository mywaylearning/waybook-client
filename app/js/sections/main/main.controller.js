function MainController($scope, $state, posts) {
  'ngInject';
  $scope.posts = posts;
  $scope.helpHtml = 'sections/main/help.html';
}

module.exports = MainController;
