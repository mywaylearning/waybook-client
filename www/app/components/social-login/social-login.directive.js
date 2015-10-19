(function() {
  'use strict';

  function SocialLoginDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/social-login/social-login.html',
      link: function(scope, el, attrs) {},
      controller: function($scope, $state, user, auth) {
        /**
         * https://github.com/MrSwitch/hello.js#4-add-listeners-for-the-user-login
         */
        hello.on('auth.login', function(_auth) {
          $scope.onLogin = true;
          // Call user information, for the given network
          hello(_auth.network).api('/me').then(function(response) {
            var _user = {
              email: response.email,
              firstName: response.first_name,
              lastName: response.last_name,
              // avatar: response.picture,
              provider: _auth.network,
              providerId: response.id
            }

            user.socialLoginCheck(_user).then(function(data) {
              auth.saveAuth(data);
              window.location.reload(false);
            }).catch(function(error) {
              if (error.error === 'not found') {
                $state.go('public.register', { userInfo: _user });
              }
            });

            if (_auth.network === 'facebook') {}
            if (_auth.network === 'google') {}
          });
        });

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
