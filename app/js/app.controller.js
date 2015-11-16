function AppController($scope, app, UserService) {
  'ngInject';

  app.init($scope);

  $scope.logout = function() {
    app.reset();
    UserService.logout();
  };

  // Create the settings modal
  // $scope.settingsData = {
  //   volume: 11
  // };

  // $ionicModal.fromTemplateUrl('sections/settings/settings.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // $scope.closeSettings = function() {
  //   $scope.modal.hide();
  // };

  // $scope.showSettings = function() {
  //   $scope.modal.show();
  // };

  // $scope.saveSettings = function() {
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  // $scope.loginData = {};
  //
  // $ionicModal.fromTemplateUrl('sections/app/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });
  //
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };
  //
  // $scope.login = function() {
  //   $scope.modal.show();
  // };
  //
  // $scope.doLogin = function() {
  //   debug('doing login', $scope.loginData);
  //
  //   // simulation -- remove this and put real login logic
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 3000);
  // };
}

module.exports = AppController;
