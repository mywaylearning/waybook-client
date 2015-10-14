(function() {
  'use strict';

  function SocialLoginDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/social-login/social-login.html',
      link: function(scope, el, attrs) {},
      controller: function($scope) {
        /**
         * https://github.com/MrSwitch/hello.js#4-add-listeners-for-the-user-login
         */
        hello.on('auth.login', function(auth) {

          // Call user information, for the given network
          hello(auth.network).api('/me').then(function(response) {
            if (auth.network === 'facebook') {
              // TODO: Get required info from FB
            }
          });
        });

        $scope.facebook = function(){
          hello('facebook').login({scope: 'email'});
        };
      }
    }
  }

  module.exports = [SocialLoginDirective];
}());
