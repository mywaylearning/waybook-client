'use strict';

var debug = require('debug')('waybook:RouterConfig');
var fs = require('fs');

require('ionic');

function RouterConfig($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, store, ROLES, LOCAL_STORAGE_KEYS) {
  var userResolve, guestResolve, key;

  $urlMatcherFactoryProvider.strictMode(false);
  $urlMatcherFactoryProvider.caseInsensitive(true);
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');

  userResolve = {
    userGrant: function(grant) {
      return grant.only([ROLES.user], ['app.main']);
    }
  };

  guestResolve = {
    guestGrant: function(grant) {
      return grant.only([ROLES.guest], ['public.login']);
    }
  };

  $stateProvider

  /**
   * CUSTOM DECORATOR
   * Because life is too short to type in full paths to template files.
   */
    .decorator('views', function(state, parent) {
    var result = {};
    var views = parent(state);

    var platform = '';

    // If we ever need platform-specific views, we'll use this
    // if (state.data && state.data.platformVariants !== undefined) {
    //   if (ionic.Platform.isAndroid()) {
    //     platform = '-droid-';
    //   } else if (ionic.Platform.isIOS()) {
    //     platform = '-ios-';
    //   }
    // }

    // if a templateUrl is already defined above the view, then we can skip all this.
    if (state.templateUrl) {
      return views;
    }

    // if it's abstract, we can skip it also
    if (state.abstract) {
      return views;
    }

    var stateNameParts = state.name.split('.');
    var baseDir = '/' + stateNameParts[0];
    var section = '';
    var sectionDir = '';
    if (stateNameParts.length === 2) {
      sectionDir = '/' + stateNameParts[1];
      section = stateNameParts[1];
    } else if (stateNameParts.length === 3) {
      sectionDir = '/' + stateNameParts[1];
      section = stateNameParts[2];
    }

    angular.forEach(views, function(config, name) {
      if (config.templateUrl) {
        result[name] = config;
      } else {
        var viewNameParts = name.split('@');
        config.templateUrl = '/app/sections' + sectionDir + '/' + section + '.' + viewNameParts[0] + platform + '.html';
        result[name] = config;
      }
    });

    return result;
  })

  .state('public', {
    abstract: true,
    //templateUrl: 'app/sections/app/public-base.html',
    template: '<ion-nav-view name="publicContent"></ion-nav-view>',
    controller: function($scope, currentUser) {
      $scope.app.user = currentUser;
    },
    resolve: {
      currentUser: function(user) {
        return user.currentUser();
      }
    }
  })

  .state('public.login', {
    url: '^/login',
    views: {
      'publicContent': {
        templateUrl: 'app/sections/login/login.publicContent.html',
        controller: 'LoginController'
      }
    }
  })

  .state('public.verify', {
    url: '^/verify',
    views: {
      'publicContent': {
        templateUrl: 'app/sections/verify/verify.publicContent.html',
        controller: 'VerifyController'
      }
    }
  })

  .state('public.register', {
    url: '^/register',
    views: {
      'publicContent': {
        templateUrl: 'app/sections/register/register.publicContent.html',
        controller: 'RegisterController'
      }
    }
  })

  .state('public.intro', {
    url: '^/intro',
    views: {
      'publicContent': {
        templateUrl: 'app/sections/intro/intro.publicContent.html',
        controller: 'IntroController'
      }
    }
  })

  .state('app', {
    abstract: true,
    templateUrl: 'app/sections/app/base.html',
    controller: function(app) {
      app.setUser();
    },
    resolve: userResolve
  })

  // .state('app.logout', {
  //   url: '^/logout',
  //   templateUrl: 'app/sections/app/logout.html',
  //   controller: function($scope) {
  //     debug($scope);
  //     $scope.logout();
  //   }
  // })

  .state('app.discover', {
    abstract: true,
    url: '/discover',
    views: {
      'bodyContent': {
        template: '<ion-nav-view name="discover-bodyContent"></ion-nav-view>'
      }
    }
  })

  .state('app.discover.entry', {
    url: '',
    views: {
      'discover-bodyContent': {
        templateUrl: 'app/sections/discover/discover.bodyContent.html',
        controller: 'DiscoverController'
      }
    }
  })

  .state('app.discover.exploration', {
    url: '/:category/:exploration',
    views: {
      'discover-bodyContent': {
        templateUrl: 'app/sections/discover/exploration.bodyContent.html',
        controller: 'ExplorationController'
      }
    }
  })

  .state('app.plan', {
    url: '/plan',
    views: {
      'bodyContent': {
        controller: 'PlanController'
      }
    }
  })


  .state('app.unite', {
    url: '/unite',
    cache: false,
    views: {
      'bodyContent': {
        controller: 'UniteController'
      }
    },
    resolve: {
      contacts: function (ContactService) {
        return ContactService.all();
      }
    }
  })

  .state('app.me', {
    url: '/me',
    views: {
      'bodyContent': {
        controller: 'MeController'
      }
    }
  })

  .state('app.help-feedback', {
    url: '/help-feedback',
    views: {
      'bodyContent': {
        controller: 'HelpFeedbackController'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'bodyContent': {
        controller: 'AboutController'
      }
    }
  })

  .state('app.main', {
    cache: false,
    url: '/main',
    views: {
      'way-post': {
        template: '<way-post></way-post>',
      },
      'bodyContent': {
        controller: 'MainController'
      }
    }
  })

  .state('app.main.thought', {
    url: '/thought',
    views: {
      'way-post': {
        template: '<way-post type="thought"></way-post>',
      }
    }
  })

  .state('app.main.goal', {
    url: '/goal',
    views: {
      'way-post': {
        template: '<way-post type="goal"></way-post>',
      }
    }
  })

  .state('app.main.discovery', {
    url: '/discovery',
    views: {
      'way-post': {
        template: '<way-post type="discovery"></way-post>',
      }
    }
  })

  .state('app.main.resource', {
    url: '/resource',
    views: {
      'way-post': {
        template: '<way-post type="resource"></way-post>',
      }
    }
  });

  // .state('app.search', {
  //   url: '^/search',
  //   views: {
  //     'bodyContent': { controller: 'SearchController' }
  //   }
  // })
  //
  //
  //
  // .state('app.single', {
  //   url: '^/playlists/:playlistId',
  //   views: {
  //     'bodyContent': { controller: 'PlaylistController' }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  key = LOCAL_STORAGE_KEYS.introSeen;

  if (store.get(key)) {
    $urlRouterProvider.otherwise('/login');
  } else {
    $urlRouterProvider.otherwise('/intro');
  }

}

RouterConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$urlMatcherFactoryProvider',
  '$locationProvider',
  'store',
  'ROLES',
  'LOCAL_STORAGE_KEYS'
];

module.exports = RouterConfig;
