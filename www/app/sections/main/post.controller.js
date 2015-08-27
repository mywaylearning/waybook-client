'use strict';

function PostController($scope, post) {
  $scope.post = post;
}

module.exports = ['$scope', 'post', PostController];
