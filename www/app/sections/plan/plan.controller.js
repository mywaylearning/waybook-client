(function() {

  'use strict';

  var debug = require('debug')('waybook:PlanController');

  function PlanController($scope, $state, posts, tags) {
    $scope.tags = tags;
    $scope.posts = posts;
  }

  module.exports = ['$scope', '$state', 'posts', 'tags', PlanController];

}());
