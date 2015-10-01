(function() {
  'use strict';

  function Big5Directive() {
    return {
      restrict: 'E',
      templateUrl: '/app/components/exploration/results/big5.html',
      controller: 'Big5Controller',
      scope: {
        results: '='
      }
    }
  }


  module.exports = Big5Directive;


}());