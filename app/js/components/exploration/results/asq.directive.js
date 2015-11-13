(function() {
  'use strict';

  function AsqController() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/results/asq.html',
      controller: 'AsqController',
      scope: {
        results: '=',
        exploration: '='
      }
    }
  }


  module.exports = AsqController;


}());
