'use strict';

function MainController($scope, $state, posts) {
  $scope.posts = posts;
}

module.exports = ['$scope', '$state', 'posts', MainController];
