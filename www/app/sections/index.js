(function() {

  'use strict';

  var app = angular.module('waybook');

  app.controller('LoginController', require('./login/login.controller.js'));
  app.controller('RegisterController', require('./register/register.controller.js'));
  app.controller('MainController', require('./main/main.controller.js'));
  app.controller('MainTypeController', require('./main/mainType.controller.js'));
  app.controller('MainPostController', require('./main/post.controller.js'));
  app.controller('DiscoverController', require('./discover/discover.controller.js'));
  app.controller('ExplorationController', require('./discover/exploration.controller.js'));
  app.controller('PlanController', require('./plan/plan.controller.js'));

  app.controller('UniteController', require('./unite/unite.controller.js'));
  app.controller('UniteDetailController', require('./unite/unite.detail.controller.js'));
  app.controller('UniteEditController', require('./unite/unite.edit.controller.js'));

  app.controller('MeController', require('./me/me.controller.js'));
  app.controller('MeAccountController', require('./me/account.controller.js'));
  app.directive('passwordMatch', require('./me/passwordMatch.directive.js'));
  app.controller('MeDiscoveriesController', require('./me/discoveries.controller.js'));
  app.controller('MeSponsorsController', require('./me/sponsors.controller.js'));

  app.controller('HelpFeedbackController', require('./help-feedback/help-feedback.controller.js'));
  app.controller('AboutController', require('./about/about.controller.js'));
  app.controller('IntroController', require('./verify/verify.controller.js'));
  app.controller('VerifyController', require('./verify/verify.controller.js'));
}());
