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
          if (_auth.network === 'facebook') {
            hello(_auth.network).api('/me/permissions').then(function(response) {
              if (!checkPermission(response.data, 'email')) {
                // User didn't authorized e-mail
                hello(_auth.network).api('/me/permissions', 'delete').then(function() {
                  logout();
                  $scope.noEmail = true;
                  $scope.$apply();
                });
              } else {
                doLogin(_auth);
              }
            }, function(error) {
              logout();
            });
          } else {
            doLogin(_auth);
          }
        });

        function doLogin(_auth) {
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
          }, function(error) {
            logout();
          });
        }

        function checkPermission(data, permission) {
          var toReturn = false;
          angular.forEach(data, function(item) {
            if (item.permission === permission) {
              if (item.status !== 'declined') {
                toReturn = true;
              }
            }
          });

          return toReturn;
        }

        function logout() {
          hello.logout('facebook');
          hello.logout('google');
          $scope.onLogin = false;
          $scope.$apply();
        }

        $scope.login = function(network) {
          var opts = {
            scope: 'email'
          };

          if (network === 'facebook') {
            opts.redirect_uri = '/#!/login';
          }
          hello(network).login(opts);
        };
      }
    }
  }

  module.exports = [SocialLoginDirective];
}());
