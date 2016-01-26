/* globals hello, facebookConnectPlugin */
function SocialLoginDirective($ionicLoading, $q, $state, UserService) {
  return {
    restrict: 'E',
    templateUrl: 'components/social-login/social-login.html',
    controller: function($scope) {
      'ngInject';

      // This method is to get the user profile info from the facebook api
      var getFacebookProfileInfo = function(authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?access_token=' + authResponse.accessToken, null,
          function(response) {
            console.log(response);
            info.resolve(response);
          },
          function(response) {
            console.log(response);
            info.reject(response);
          }
        );
        return info.promise;
      };

      // This is the success callback from the login method
      var fbLoginSuccess = function(response) {
        var authResponse = response.authResponse;
        if (!authResponse) {
          fbLoginError('Cannot find the authResponse');
          return;
        }

        getFacebookProfileInfo(authResponse)
          .then(function(profileInfo) {
            var _user = {
              email: profileInfo.email,
              firstName: profileInfo.first_name,
              lastName: profileInfo.last_name,
              provider: 'facebook',
              providerId: profileInfo.id,
              auth: authResponse
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
            $ionicLoading.hide();
          }, function(fail) {
            // Fail get profile info
            console.log('profile info fail', fail);
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
          facebookConnectPlugin.getLoginStatus(function(success) {
            console.log(success);
            if (success.status === 'connected') {
              // The user is logged in and has authenticated your app, and response.authResponse supplies
              // the user's ID, a valid access token, a signed request, and the time the access token
              // and signed request each expire
              fbLoginSuccess(success);

              // if (!user.userID) {
              //   getFacebookProfileInfo(success.authResponse)
              //   .then(function(profileInfo) {
              //   // For the purpose of this example I will store user data on local storage
              //   // UserService.setUser({
              //   // authResponse: success.authResponse,
              //   // userID: profileInfo.id,
              //   // name: profileInfo.name,
              //   // email: profileInfo.email,
              //   // picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
              //   // });

              //     $state.go('app.home');
              //   }, function(fail) {
              //     // Fail get profile info
              //     console.log('profile info fail', fail);
              //   });
              // } else {
              //   $state.go('app.home');
              // }
            } else {
              // If (success.status === 'not_authorized') the user is logged in to Facebook,
              // but has not authenticated your app
              // Else the person is not logged into Facebook,
              // so we're not sure if they are logged into this app or not.
              console.log('getLoginStatus', success.status);

              $ionicLoading.show({
                template: 'Logging in...'
              });

              // Ask the permissions you need. You can learn more about
              // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
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
