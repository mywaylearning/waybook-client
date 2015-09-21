(function() {

  'use strict';

  var debug = require('debug')('waybook:DiscoveryController');

  function DiscoveryController($scope, categories, explorations) {

    debug('here we are');

    angular.forEach(explorations, function(exploration) {
      angular.forEach(categories, function(category) {
        if (!category.explorations) {
          category.explorations = [];
        }
        if (category.category === exploration.category) {
          category.explorations.push(exploration);
        }
      });
    });

    $scope.viewData = {
      categories: categories
    };

  }

  module.exports = ['$scope', 'categories', 'explorations', DiscoveryController];

}());
