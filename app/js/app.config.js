/* globals filepicker, hello */

require('angular');

function AppConfig($sceDelegateProvider, $ionicConfigProvider, gravatarServiceProvider, FILEPICKER_API_KEY, HELLO_IDS) {
  'ngInject';
  var transitionType = 'platform';

  $sceDelegateProvider.resourceUrlWhitelist([
    'self'
  ]);

  gravatarServiceProvider.secure = true;

  filepicker.setKey(FILEPICKER_API_KEY);

  if (!ionic.Platform.isWebView()) {
    transitionType = 'none';
    hello.init({
      facebook: HELLO_IDS.facebook,
      google: HELLO_IDS.google,
      access_token: ''
    }, {
      redirect_uri: '/',
      oauth_proxy: 'https://auth-server.herokuapp.com/proxy',
      scope: 'publish_actions,email',
      oauth_version: '1.0a',
      display: 'page'
    });
  }

  // Ionic configuration
  $ionicConfigProvider.views.transition(transitionType);
  $ionicConfigProvider.navBar.alignTitle('center');
}

angular.module('app.config', [])
  .constant('AUTH_URL', process.env.AUTH_URL)
  .constant('API_URL', process.env.API_URL)
  .constant('store', require('store'))
  .constant('RECAPTCHA_KEY', process.env.RECAPTCHA_KEY)

.constant('EMBEDLY_CONFIG', {
  'url': process.env.EMBEDLY_URL,
  'key': process.env.EMBEDLY_KEY
})

.constant('FILEPICKER_API_KEY', 'AHVaoDU9JRwao92AZiuRpz')

.constant('HELLO_IDS', {
  'facebook': process.env.FACEBOOK_CLIENT_ID,
  google: process.env.GOOGLE_CLIENT_ID
})

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
  'unauthorizedRequest': 'way.unauthorized',
  'unknown': 'way.unknown'
})

.constant('FORM_ERRORS', {
  'invalidLogin': 'invalid_grant',
  'validationError': 'ValidationError',
  'userEmailTaken': 'EmailAlreadyInUse',
  'entityNotFound': 'EntityNotFound',
  'fileUploadTooLarge': 'FileUploadTooLarge',
  'invalidFileType': 'InvalidFileType'
})

.constant('USER_AGE', {
  'minimumAge': 13,
  'minimumParentAge': 18
})

.constant('POST_TYPES', {
  'thought': 'Thought',
  'goal': 'Goal',
  'discovery': 'Discovery',
  'resource': 'Resource'
})

.constant('STATE_LOADING', {
  'timeout': 3000
})

.constant('DEFAULT_PER_PAGE', 20)

.config(AppConfig);
