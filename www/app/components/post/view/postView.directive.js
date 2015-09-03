(function() {

  'use strict';

  function wayPostView() {

    return {
      restrict: 'EA',
      scope: {
        post: '=',
        user: '='
      },
      transclude: true,
      controller: 'PostViewController',
      templateUrl: '/app/components/post/view/postView.html',
      link: function(scope, el, attrs) {}
    };
  }

  module.exports = [wayPostView];

}());
