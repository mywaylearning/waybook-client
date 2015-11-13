(function() {

  'use strict';

  function linkPreview() {

    return {
      restrict: 'E',
      scope: {
        link: '='
      },
      templateUrl: '/app/components/common/linkPreview.html'
    };
  }

  module.exports = linkPreview;

}());
