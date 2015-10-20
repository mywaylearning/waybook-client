'use strict';

var debug = require('debug')('waybook:RouterConfig');
var fs = require('fs');

require('ionic');

function RouterConfig($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, store, ROLES, LOCAL_STORAGE_KEYS, POST_TYPES) {
  var userResolve, guestResolve, key;

  $urlMatcherFactoryProvider.strictMode(false);
  $urlMatcherFactoryProvider.caseInsensitive(true);
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');

  userResolve = {
    userGrant: function(grant) {
      return grant.only([ROLES.user], ['app']);
    }
  };

  guestResolve = {
    guestGrant: function(grant) {
      return grant.only([ROLES.guest], ['public']);
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
    template: '<ion-nav-bar class="bar-stable"><ion-nav-back-button state-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-nav-view name="publicContent"></ion-nav-view>',
    resolve: guestResolve
  })

  .state('public.login', {
    url: '/login',
    views: {
      'publicContent': {
        templateUrl: 'app/sections/login/login.publicContent.html',
        controller: 'LoginController'
      }
    }
  })

  .state('public.login.verify', {
    url: '/verify',
    views: {
      'verify': {
        templateUrl: 'app/sections/verify/verify.publicContent.html',
        controller: 'VerifyController'
      }
    }
  })

  .state('public.recover-password', {
    url: '/recover-password/{token}',
    views: {
      'publicContent': {
        controller: 'RecoverPasswordController'
      }
    }
  })

  .state('public.register', {
    url: '/register',
    params: {
      userInfo: false
    },
    views: {
      'publicContent': {
        templateUrl: 'app/sections/register/register.publicContent.html',
        controller: 'RegisterController'
      }
    }
  })

  .state('public.intro', {
    url: '/',
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

  .state('app.discover', {
    url: '/discover',
    cache: false,
    views: {
      'bodyContent': {
        controller: 'DiscoverController'
      }
    },
    resolve: {
      categories: function(ExplorationService) {
        return ExplorationService.getCategories();
      }
    }
  })

  .state('app.discover.exploration', {
    url: '/:exploration',
    views: {
      'bodyContent@app': {
        controller: 'ExplorationController'
      }
    },
    resolve: {
      exploration: function(ExplorationService, $stateParams) {
        return ExplorationService.getBySlug($stateParams.exploration);
      }
    }
  })

  .state('app.discover.exploration.results', {
    url: '/results',
    views: {
      'bodyContent@app': {
        templateUrl: 'app/sections/discover/result.bodyContent.html',
        controller: function($scope, exploration, results) {
          $scope.viewData = {
            exploration: exploration,
            results: results
          };
        }
      }
    },
    resolve: {
      results: function(ExplorationService, exploration) {
        return ExplorationService.getExplorationResults(exploration);
      }
    }
  })

  .state('app.plan', {
    url: '/plan?tag',
    views: {
      'bodyContent': {
        controller: 'PlanController'
      }
    },
    resolve: {
      tags: function(TagService) {
        return TagService.timeline();
      },
      posts: function(PostService, $stateParams) {
        return PostService.timelineByTag($stateParams.tag);
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
      contacts: function(ContactService) {
        return ContactService.all();
      }
    }
  })

  .state('app.unite.contact', {
    url: '/{contactId:[0-9]{1,4}}',
    cache: false,
    views: {
      'bodyContent@app': {
        controller: 'UniteDetailController'
      }
    },
    resolve: {
      contact: function(ContactService, $stateParams) {
        return ContactService.getById($stateParams.contactId);
      }
    }
  })

  .state('app.unite.edit', {
    url: '/edit/{contactId:[0-9]{1,4}}',
    cache: false,
    views: {
      'bodyContent@app': {
        controller: 'UniteEditController'
      }
    },
    resolve: {
      contact: function(ContactService, $stateParams) {
        return ContactService.getById($stateParams.contactId);
      }
    }
  })

  .state('app.me', {
    url: '/me',
    abstract: true,
    views: {
      'bodyContent': {
        templateUrl: 'app/sections/me/me.bodyContent.html',
        controller: function($scope, $state) {
          $scope.goTab = function(tab) {
            $state.go('app.me.' + tab);
          };
        }
      }
    }
  })

  .state('app.me.account', {
    url: '',
    cache: false,
    views: {
      'account-tab': {
        templateUrl: 'app/sections/me/account/edit.tab.html',
        controller: 'MeAccountEditController'
      }
    },
    resolve: {
      currentUser: function(user) {
        return user.currentUser(true);
      }
    },
    params: {
      ageRequired: false
    }
  })

  .state('app.me.discoveries', {
    url: '/discoveries',
    cache: false,
    views: {
      'discoveries-tab': {
        templateUrl: 'app/sections/me/discoveries.tab.html',
        controller: 'MeDiscoveriesController'
      }
    },
    resolve: {
      discoveries: function(PostService) {
        return PostService.collection('discovery');
      }
    }
  })

  .state('app.me.sponsors', {
    url: '/sponsors',
    views: {
      'sponsors-tab': {
        templateUrl: 'app/sections/me/sponsors.tab.html',
        controller: 'MeSponsorsController'
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
    url: '/',
    views: {
      'way-post': {
        template: '<way-post-form></way-post-form>',
      },
      'bodyContent': {
        controller: 'MainController'
      }
    },
    resolve: {
      posts: function(PostService) {
        return PostService.collection();
      }
    }

  })

  .state('app.main.type', {
    url: ':type',
    views: {
      'way-post-form': {
        template: '<way-post-form type="type" posts="posts"></way-post-form>',
        controller: 'MainTypeController'
      }
    },
    resolve: {
      type: function($stateParams) {
        var type = $stateParams.type;
        return angular.isDefined(POST_TYPES[type]) ? type : false;
      }
    }
  })

  .state('app.main.post', {
    url: 'post/:id',
    views: {
      'bodyContent@app': {
        controller: 'MainPostController'
      }
    },
    resolve: {
      post: function(PostService, $stateParams) {
        return PostService.getById($stateParams.id);
      }
    }
  });

  $urlRouterProvider.otherwise('/');

  // if none of the above states are matched, use this as the fallback
  // key = LOCAL_STORAGE_KEYS.introSeen;
  //
  // if (store.get(key)) {
  //   $urlRouterProvider.otherwise('/');
  // } else {
  //   $urlRouterProvider.otherwise('/intro');
  // }

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
}

RouterConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$urlMatcherFactoryProvider',
  '$locationProvider',
  'store',
  'ROLES',
  'LOCAL_STORAGE_KEYS',
  'POST_TYPES'
];

module.exports = RouterConfig;
