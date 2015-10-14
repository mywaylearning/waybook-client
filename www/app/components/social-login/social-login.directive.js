(function() {
  'use strict';

  function SocialLoginDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/social-login/social-login.html',
      link: function(scope, el, attrs) {},
      controller: function($scope, $state, user) {
        /**
         * https://github.com/MrSwitch/hello.js#4-add-listeners-for-the-user-login
         */
        hello.on('auth.login', function(auth) {
          // Call user information, for the given network
          hello(auth.network).api('/me').then(function(response) {
            var model = {
              email: response.email,
              firstName: response.first_name,
              lastName: response.last_name,
              avatar: response.picture
            }

            if (auth.network === 'facebook') {
              console.log(response);
            }

            if (auth.network === 'google') {
              _user.email = response.email;
              _user.provider = 'google';
              _user.providerId = response.id;
              user.socialLoginCheck(_user).then(function(_response) {
                console.log(_response);
              });
              // console.log(hello('google').getAuthResponse());
            }
          });
        });

        $scope.facebook = function() {
          hello('facebook').login({
            scope: 'email'
          });
        };

        $scope.google = function() {
          hello('google').login({
            scope: 'email'
          });
        };
      }
    }
  }

  module.exports = [SocialLoginDirective];
}());
