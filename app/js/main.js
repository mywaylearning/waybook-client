/* eslint angular/window-service:0 */
window._ = require('./components/lodash.custom.min');
window.hello = require('hello');
require('intl-tel-input');
require('intl-tel-input-utils');

require('angular');
require('ionic');
require('angular-animate');
require('angular-sanitize');
require('angular-messages');
require('angular-ui-router');
require('ionic-angular');
require('./app.config');
require('./templates');
require('ionic-ion-showWhen');
require('restangular');
require('angular-gravatar');
require('ng-tags-input');
require('ionic-datepicker');
require('mentio');
require('intl-phone-number');
require('ng-segmentio');
require('highcharts');
require('highcharts-more');
require('highcharts-solidgauge');
require('highcharts-ng');

angular.module('waybook', [
  'ionic',
  'app.config',
  'ionic.ion.showWhen',
  'templates',
  'ngAnimate',
  'ngSanitize',
  'ngMessages',
  'ui.router',
  'restangular',
  'ui.gravatar',
  'ngTagsInput',
  'mentio',
  'ionic-datepicker',
  'internationalPhoneNumber',
  'segmentio',
  'highcharts-ng'
])

.controller('AppController', require('./app.controller.js'))
.factory('app', require('./app.service.js'))
.run(require('./app.run.js'));


require('./core');
require('./components');
require('./sections');

angular.bootstrap(document, ['waybook']);
