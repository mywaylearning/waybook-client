/* globals hello, facebookConnectPlugin */
function SocialLoginDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/social-login/social-login.html',
    controller: function($scope, $ionicLoading, $q, $state, UserService, auth) {
      'ngInject';

      // This method is to get the user profile info from the facebook api
      var getFacebookProfileInfo = function(authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?access_token=' + authResponse.accessToken, null,
          function(response) {
            info.resolve(response);
          },
          function(response) {
            info.reject(response);
          }
        );
        return info.promise;
      };

      // This method is to get the user permissions info from the facebook api
      var getFacebookPermissions = function(authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me/permissions?access_token=' + authResponse.accessToken, null,
          function(response) {
            info.resolve(response);
          },
          function(response) {
            info.reject(response);
          }
        );
        return info.promise;
      };

      // This method is to delete user permissions in order to complete login successfully
      var deleteFacebookPermissions = function(authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me/permissions?method=delete&access_token=' + authResponse.accessToken, null,
          function(response) {
            info.resolve(response);
          },
          function(response) {
            info.reject(response);
          }
        );
        return info.promise;
      };

      // Perform login if everything is ok
      var doLogin = function(authResponse) {
        getFacebookProfileInfo(authResponse).then(function(profileInfo) {
          var _user = {
            email: profileInfo.email,
            firstName: profileInfo.first_name,
            lastName: profileInfo.last_name,
            provider: 'facebook',
            providerId: profileInfo.id,
            auth: {
              access_token: authResponse.accessToken
            }
          };

          UserService.socialLoginCheck(_user).then(function(data) {
            auth.saveAuth(data);
            $state.go('app.main.home');
          }).catch(function(error) {
            if (error.error === 'not found') {
              $state.go('public.register', {
                userInfo: _user
              });
            }
          });
        }, function(fail) {
          // Fail get profile info
          console.log('profile info fail', fail);
        });
      };

      // This is the success callback from the login method
      var fbLoginSuccess = function(response) {
        var authResponse = response.authResponse;
        if (!authResponse) {
          fbLoginError('Cannot find the authResponse');
          return;
        }

        getFacebookPermissions(authResponse).then(function(permissions) {
          if (!$scope.checkPermission(permissions.data, 'email')) {
            // User didn't authorized e-mail
            deleteFacebookPermissions(authResponse).then(function() {
              $scope.logout();
              $scope.noEmail = true;
            });
          } else {
            doLogin(authResponse);
          }
          $ionicLoading.hide();
        });
      };

      // This is the fail callback from the login method
      var fbLoginError = function(error) {
        console.log('fbLoginError', error);
        $ionicLoading.hide();
      };

      $scope.login = function(network, event) {
        event.preventDefault();
        if (ionic.Platform.isWebView()) {
          $ionicLoading.show({
            template: 'Please wait...'
          });
          $scope.noEmail = false;
          facebookConnectPlugin.getLoginStatus(function(success) {
            if (success.status === 'connected') {
              // The user is logged in and has authenticated your app, and response.authResponse supplies
              // the user's ID, a valid access token, a signed request, and the time the access token
              // and signed request each expire
              fbLoginSuccess(success);
            } else {
              // If (success.status === 'not_authorized') the user is logged in to Facebook,
              // but has not authenticated your app
              // Else the person is not logged into Facebook,
              // so we're not sure if they are logged into this app or not.

              // Ask the permissions you need. You can learn more about
              facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
            }
          });
        } else {
          hello(network).login({
            scope: 'email'
          });
        }
      };
    }
  };
}

module.exports = SocialLoginDirective;
