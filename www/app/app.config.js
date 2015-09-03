(function() {
  'use strict';

  require('angular');

  angular.module('app.config', [])
  .constant('AUTH_URL', process.env.AUTH_URL)
  .constant('API_URL', process.env.API_URL)
  .constant('store', require('store'))
  .constant('Moment', require('moment'))
  //.constant('_', require('lodash'))
  //.constant('$', require('jquery'))

  .constant('EMBEDLY_CONFIG', {
    'url': process.env.EMBEDLY_URL,
    'key': process.env.EMBEDLY_KEY
  })

  .constant('FILEPICKER_API_KEY', 'AHVaoDU9JRwao92AZiuRpz')

  .constant('ROLES', {
    'guest': 'way.guest',
    'user': 'way.user'
  })

  .constant('LOCAL_STORAGE_KEYS', {
    'auth': 'way.auth',
    'invitationToken': 'way.invitationToken',
    'invitationData': 'way.invitationData',
    'introSeen': 'way.introSeen'
  })

  .constant('EVENTS', {
    'requestStart': 'way.request.start',
    'requestFinish': 'way.request.finish'
  })

  .constant('ERROR', {
    'grantRejected': 'way.grant.rejected',
    'unauthorizedRequest': 'way.unauthorized'
  })

  .constant('FORM_ERRORS', {
    'invalidLogin': 'OauthError',
    'userEmailTaken': 'EmailAlreadyInUse',
    'entityNotFound': 'EntityNotFound',
    'fileUploadTooLarge': 'FileUploadTooLarge',
    'invalidFileType': 'InvalidFileType'
  })

  .constant('POST_TYPES', {
    'thought': 'Thought',
    'goal': 'Goal',
    'discovery': 'Discovery',
    'resource': 'Resource'
  })

  .constant('DEFAULT_PER_PAGE', 20)
  .constant('SWAGGER', require('./app.swagger.js'))

  .config(AppConfig);

  function AppConfig($sceDelegateProvider, FILEPICKER_API_KEY) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self'
    ]);

    filepicker.setKey(FILEPICKER_API_KEY);
  }

  AppConfig.$inject = ['$sceDelegateProvider', 'FILEPICKER_API_KEY'];

}());
