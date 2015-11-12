'use strict';

function MainController($scope, $state, posts) {
  $scope.posts = posts;
  $scope.helpHtml = 'app/sections/main/help.html';
}

module.exports = ['$scope', '$state', 'posts', MainController];
