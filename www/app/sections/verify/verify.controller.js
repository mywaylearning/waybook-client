'use strict';

function VerifyController($scope, router, user, errorHandler) {

  var token = location.hash.split('t=');

  if (!token[1]) {
    return router.goToLoggedOut();
  }

  var model = {
    verify: token[1]
  };

  user
    .register(model)
    .then(function(data) {
      router.goToLoggedOut();
    })
    .catch(function(error) {
      router.goToLoggedOut();
    });
};

module.exports = [
  '$scope',
  'router',
  'user',
  'errorHandler',
  VerifyController
];