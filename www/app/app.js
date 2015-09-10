(function() {

  'use strict';

  require('ionic');
  require('angular');
  require('angular-animate');
  require('angular-sanitize');
  require('angular-ui-router');
  require('ionic-angular');
  require('./app.config');
  require('restangular');
  require('ionic-ion-showWhen');
  require('ion-wizard');
  require('angular-gravatar');
  require('moment');
  require('angular-moment');
  require('ng-tags-input');
  require('mentio');
  require('intl-phone-number');
  require('state-nav-back-button');
  require('ionic-datepicker');


  window.debug = require('debug');

  //var _ = require('lodash');

  angular.module('waybook', [
    'ionic',
    'ionic.ion.showWhen',
    'ionic.wizard',
    'app.config',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ui.gravatar',
    'restangular',
    'angularMoment',
    'ngTagsInput',
    'mentio',
    'internationalPhoneNumber',
    'stateBackButtonIonic',
    'ionic-datepicker'
  ])

  .controller('AppController', require('./app.controller.js'))
  .factory('app', require('./app.service.js'))
  .run(require('./app.run.js'));

  require('./core');
  require('./components');
  require('./sections');

}());
