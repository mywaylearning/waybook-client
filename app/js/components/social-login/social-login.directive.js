/* globals hello */
function SocialLoginDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/social-login/social-login.html',
    controller: function($scope) {
      'ngInject';
      $scope.login = function(network) {
        hello(network).login({
          scope: 'email'
        });
      };
    }
  };
}

module.exports = SocialLoginDirective;