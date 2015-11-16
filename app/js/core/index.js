/* eslint angular/di: 0 */

angular.module('waybook')

  .config(require('./router/router.config.js'))
  .factory('router', require('./router/router.service.js'))

  .factory('api', require('./restangular/rest-api.service.js'))
  .factory('embedly', require('./restangular/rest-embedly.service.js'))
  .config(require('./restangular/restangular.config.js'))
  .run(require('./restangular/restangular.run.js'))

  .factory('auth', require('./auth/auth.service.js'))
  .factory('authStore', require('./auth/auth-store.service.js'))

  .factory('grant', require('./grant/grant.service.js'))
  .run(require('./grant/grant.run.js'))

  .factory('Role', require('./role/role.service.js'))
  .run(require('./role/role-guest.run.js'))
  .run(require('./role/role-user.run.js'))

  .factory('UserService', require('./user/user.service.js'))

  // .factory('invitationToken', require('./invitation-token/invitation-token.service.js'))
  // .run(['invitationToken', function(invitationToken) {
  //   invitationToken.checkToken();
  // }])
  // .factory('invitationStore', require('./invitation-token/invitation-token-store.service.js'))

  .factory('errorHandler', require('./errors/error-handler.service.js'))
  .directive('resetValidation', require('./errors/resetValidation.directive.js'))
  .factory('utils', require('./utils/utils.service.js'))

  .factory('CommentService', require('./comment/comment.service.js'))

  .factory('ContactService', require('./contact/contact.service.js'))

  .factory('TagService', require('./tag/tag.service.js'))

  .factory('PostService', require('./post/post.service.js'))

  .factory('ExplorationService', require('./exploration/exporation.service.js'))

  .factory('DashboardService', require('./dashboard/dashboard.service.js'));
