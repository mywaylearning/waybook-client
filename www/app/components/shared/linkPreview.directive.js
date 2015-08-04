(function() {

  'use strict';

  function linkPreview() {

    return {
      restrict: 'E',
      scope: {
        link: '='
      },
      templateUrl: '/app/components/shared/linkPreview.html'
    };
  }

  module.exports = linkPreview;

}());
