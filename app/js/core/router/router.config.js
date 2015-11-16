/* globals hello */
function RouterConfig($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, store, ROLES, LOCAL_STORAGE_KEYS, POST_TYPES) {
  'ngInject';
  var userResolve;
  var guestResolve;

  $urlMatcherFactoryProvider.strictMode(false);
  $urlMatcherFactoryProvider.caseInsensitive(true);
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');

  userResolve = {
    analytics: function(segmentio) {
      return segmentio.load('gcb6avxous');
    },
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
      var stateNameParts = state.name.split('.');
      var section = '';
      var sectionDir = '';
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

      if (stateNameParts.length === 2) {
        sectionDir = '/' + stateNameParts[1];
        section = stateNameParts[1];
      } else if (stateNameParts.length === 3) {
        sectionDir = '/' + stateNameParts[1];
        section = stateNameParts[2];
      }

      angular.forEach(views, function(config, name) {
        var viewNameParts = name.split('@');
        if (config.templateUrl) {
          result[name] = config;
        } else {
          config.templateUrl = 'sections' + sectionDir + '/' + section + '.' + viewNameParts[0] + platform + '.html';
          result[name] = config;
        }
      });
      return result;
    })

  .state('public', {
    cache: false,
    abstract: true,
    template: '<ion-nav-bar class="bar-stable"><ion-nav-back-button state-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-nav-view name="publicContent"></ion-nav-view>',
    controllerAs: '',
    controller: function($scope, $state, UserService, auth) {
      function checkPermission(data, permission) {
        var toReturn = false;
        angular.forEach(data, function(item) {
          if (item.permission === permission) {
            if (item.status !== 'declined') {
              toReturn = true;
            }
          }
        });

        return toReturn;
      }

      function logout() {
        hello.logout('facebook');
        hello.logout('google');
        $scope.onLogin = false;
        $scope.$apply();
      }
      /**
       * https://github.com/MrSwitch/hello.js#4-add-listeners-for-the-user-login
       */
      hello.on('auth.login', function(_auth) {
        $state.go('public.login');
        $scope.onLogin = true;
        if (_auth.network === 'facebook') {
          hello(_auth.network).api('/me/permissions').then(function(response) {
            if (!checkPermission(response.data, 'email')) {
              // User didn't authorized e-mail
              hello(_auth.network).api('/me/permissions', 'delete').then(function() {
                logout();
                $scope.noEmail = true;
                $scope.$apply();
              });
            } else {
              doLogin(_auth);
            }
          }, function() {
            logout();
          });
        } else {
          doLogin(_auth);
        }
      });

      function doLogin(_auth) {
        // Call user information, for the given network
        hello(_auth.network).api('/me').then(function(response) {
          var _user = {
            email: response.email,
            firstName: response.first_name,
            lastName: response.last_name,
            // avatar: response.picture,
            provider: _auth.network,
            providerId: response.id
          };

          UserService.socialLoginCheck(_user).then(function(data) {
            auth.saveAuth(data);
            window.location.reload(false);
          }).catch(function(error) {
            if (error.error === 'not found') {
              $state.go('public.register', {
                userInfo: _user
              });
            }
          });

          // if (_auth.network === 'facebook') {}
          // if (_auth.network === 'google') {}
        }, function() {
          logout();
        });
      }
    },
    resolve: guestResolve
  })

  .state('public.login', {
    url: '/login',
    views: {
      'publicContent': {
        templateUrl: 'sections/login/login.publicContent.html',
        controller: 'LoginController'
      }
    }
  })

  .state('public.login.verify', {
    url: '/verify',
    views: {
      'verify': {
        templateUrl: 'sections/verify/verify.publicContent.html',
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
        templateUrl: 'sections/register/register.publicContent.html',
        controller: 'RegisterController'
      }
    }
  })

  .state('public.intro', {
    url: '/',
    views: {
      'publicContent': {
        templateUrl: 'sections/intro/intro.publicContent.html',
        controller: 'IntroController'
      }
    }
  })

  .state('app', {
    abstract: true,
    templateUrl: 'sections/app/base.html',
    controllerAs: '',
    controller: function($rootScope, $scope, $state, $ionicHistory, $ionicPopover, app) {
      $scope.routeClearCache = function($event, route) {
        $event.preventDefault();
        $ionicHistory.clearCache();
        $state.go(route, {
          tag: null
        });
      };

      $scope.showHelp = function() {
        $rootScope.$broadcast('showHelp');
      };

      $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });

      app.setUser();
    },
    resolve: userResolve
  })

  .state('app.explore', {
    url: '/explore',
    cache: false,
    views: {
      'bodyContent': {
        controller: 'ExploreController'
      }
    },
    params: {
      categoryOpen: null
    },
    resolve: {
      categories: function(ExplorationService) {
        return ExplorationService.getCategories();
      }
    }
  })

  .state('app.explore.exploration', {
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

  .state('app.explore.exploration.results', {
    url: '/results',
    views: {
      'bodyContent@app': {
        templateUrl: 'sections/explore/result.bodyContent.html',
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

  .state('app.unite.add', {
    url: '/add',
    cache: false,
    views: {
      'bodyContent@app': {
        templateUrl: 'sections/unite/form.bodyContent.html',
        controller: 'UniteFormController'
      }
    },
    resolve: {
      contact: function() {
        return false;
      }
    }
  })

  .state('app.unite.edit', {
    url: '/edit/{contactId:[0-9]{1,4}}',
    cache: false,
    views: {
      'bodyContent@app': {
        templateUrl: 'sections/unite/form.bodyContent.html',
        controller: 'UniteFormController'
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
        templateUrl: 'sections/me/me.bodyContent.html',
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
        templateUrl: 'sections/me/account/edit.tab.html',
        controller: 'MeAccountEditController'
      }
    },
    resolve: {
      currentUser: function(UserService) {
        return UserService.currentUser(true);
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
        templateUrl: 'sections/me/discoveries.tab.html',
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
        templateUrl: 'sections/me/sponsors.tab.html',
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

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'bodyContent': {
        controller: 'DashboardController'
      }
    },
    resolve: {
      dashboardData: function(DashboardService) {
        return DashboardService.get();
      }
    }
  })

  .state('app.main', {
    abstract: true,
    url: '/',
    views: {
      'bodyContent': {
        template: '<span ui-view></span>'
      }
    }
  })

  .state('app.main.home', {
    cache: false,
    url: '',
    views: {
      'bodyContent@app': {
        templateUrl: 'sections/main/main.bodyContent.html',
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
      'bodyContent@app': {
        templateUrl: 'sections/main/type.bodyContent.html',
        controller: 'MainTypeController'
      }
    },
    params: {
      deadline: null,
      onCreate: null
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
