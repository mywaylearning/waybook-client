(function() {
  'use strict';

  function SocialLoginDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/social-login/social-login.html',
      link: function(scope, el, attrs) {},
      controller: function($scope, $state) {
        $scope.login = function(network) {
          hello(network).login({
            scope: 'email'
          });
        };
      }
    }
  }

  module.exports = [SocialLoginDirective];
}());
