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
      bindToController: true,
      templateUrl: '/app/components/post/view/postView.html',
      link: function(scope, el, attrs) {}
    };
  }

  module.exports = [wayPostView];

}());
