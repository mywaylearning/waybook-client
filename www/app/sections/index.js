(function() {

  'use strict';

  var app = angular.module('waybook');

  app.controller('LoginController', require('./login/login.controller.js'));
  app.controller('RegisterController', require('./register/register.controller.js'));
  app.controller('MainController', require('./main/main.controller.js'));
  app.controller('DiscoverController', require('./discover/discover.controller.js'));
  app.controller('ExplorationController', require('./discover/exploration.controller.js'));
  app.controller('PlanController', require('./plan/plan.controller.js'));
  app.controller('UniteController', require('./unite/unite.controller.js'));
  app.controller('MeController', require('./me/me.controller.js'));
  app.controller('HelpFeedbackController', require('./help-feedback/help-feedback.controller.js'));
  app.controller('AboutController', require('./about/about.controller.js'));
  app.controller('IntroController', require('./verify/verify.controller.js'));
  app.controller('VerifyController', require('./verify/verify.controller.js'));
}());
