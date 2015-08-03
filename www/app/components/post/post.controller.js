(function() {

  'use strict';

  var debug = require('debug')('waybook:PostController');

  function PostController($scope, $state, $http, $q, $ionicModal, router, goal, SWAGGER, PostService) {
    debug('here we are (directive controller)');

    debug(SWAGGER);

    var ctrl = this;

    function init() {
      // Define type of post mode (show form)
      ctrl.postMode = false;

      // Other definitions
      ctrl.placeHolder = "Share something...";

      debug('type...? ' + ctrl.postType);
    }
    init();

    // Mocking contacts
    $http.get('app/components/post/test.json').success(function(result) {
      // angular.forEach(result, function(contact){
      //   contact.checked = false;
      // })
      ctrl.allContacts = result;
    });

    // Hashtag Mocking
    ctrl.hashtags = [];

    ctrl.searchHashtag = function(term) {
        debugger;
        var hashtagList = [];
        return $http.get('app/components/post/hashtags.json').then(function (response) {
            angular.forEach(response.data, function(item) {
                if (item.name.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
                    hashtagList.push(item);
                }
            });
            ctrl.hashtags = hashtagList;
            return $q.when(hashtagList);
        });
    };

    ctrl.getHashtagText = function(item) {
        return '<span class="hashtag">#' + item.name + '</span>';
    };


    ctrl.validateTag = function($tag) {
      if (!$tag.id) {
        // must validade if it's an e-mail
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test($tag.name);
      }

      return true;
    };


    ctrl.addContacts = function(contacts) {
      if (contacts && contacts.length) {
        angular.forEach(contacts, function(contact) {
          var exist = false;
          angular.forEach(ctrl.selectedContacts, function(selectedContact){
            if (contact.id === selectedContact.id) {
              exist = true;
            }
          });
          if (!exist) {
            ctrl.selectedContacts.push(contact);
          }
        });
      }
    };

    ctrl.selectedContacts = [
      { id: 0, name: 'Self' }
    ];

    ctrl.loadTags = function($query) {
      return $http.get('app/components/post/test.json', { cache: true}).then(function(response) {
        var contacts = response.data;
        return contacts.filter(function(contact) {
          return contact.name.toLowerCase().indexOf($query.toLowerCase()) != -1 || contact.email.toLowerCase().indexOf($query.toLowerCase()) != -1;
        });
      });
    };

    ctrl.attachPhotos = function() {
      ctrl.postMode = 'photo';
      filepicker.pick(
        {
          mimetype: 'image/*',
          services: ['COMPUTER', 'WEBCAM', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM', 'FLICKR', 'DROPBOX']
        },
        function(Blob){
          ctrl.model.image = Blob.url;
          $scope.$apply();
        },
        function(FPError){
          ctrl.postMode = 'text';
          $scope.$apply();
          console.log(FPError.toString());
        });
    };

    ctrl.attachFiles = function() {
      ctrl.postMode = 'files';
      filepicker.pickMultiple(
        {
          extensions: ['.pdf', '.doc', '.txt', '.docx'],
          services: ['COMPUTER', 'DROPBOX', 'GMAIL', 'GOOGLE_DRIVE'],
          maxFiles: 3
        },
        function(Blobs){
          console.log(Blobs);
          ctrl.model.files = Blobs;
          angular.forEach(Blobs, function(blob){
            // TODO: Add files info (url, mimetype, name?)
          });
          $scope.$apply();
        },
        function(FPError){
          console.log('aqui');
          ctrl.postMode = 'text';
          $scope.$apply();
        });
    };

    $scope.$watch('ctrl.postMode', function(newValue) {
      if (newValue === false) {
        ctrl.extractLinkUrl = null;
        ctrl.extractResult = null;
      }
    });

    ctrl.extractLink = function() {
      var pattern = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
      var regex = new RegExp(pattern);
      if (!ctrl.extractLinkUrl) {
        return;
      } else if (!regex.test(ctrl.extractLinkUrl)) {
        return;
      }

      ctrl.linkExtractionStarted = true;
      PostService.extractLink(ctrl.extractLinkUrl).then(function(result){
        ctrl.linkExtractionStarted = false;
        ctrl.extractLinkUrl = '';
        var image, imageType, imageLandscape = false;

        if (result.images.length) {
          var _image = result.images[0];
          image = _image.url;
          imageType = 'image';

          if ((_image.width / 1.1) > _image.height) {
            imageLandscape = true;
          }

        } else if (result.favicon_url) {
          image = result.favicon_url;
          imageType = 'icon';
        } else {
          image = false;
        }
        ctrl.extractResult = {
          title: result.title,
          description: result.description,
          image: image,
          imageType: imageType,
          imageLandscape: imageLandscape,
          url: result.url
        };

        ctrl.model.link = result.url;
        ctrl.model.linkTitle = result.title;
        ctrl.model.linkDescription = result.description;
      });
    };


    ctrl.removePhoto = function() {
      ctrl.model.image = null;
      ctrl.postMode = 'text';
    };

    ctrl.reset = function() {
      ctrl.model = {};
    };

    ctrl.reset();

    ctrl.save = function() {
      debug('saving...', ctrl.model);
      goal.create(ctrl.model).then(function(result){
        $state.reload();
      });
    };

  }

  module.exports = ['$scope', '$state', '$http', '$q', '$ionicModal', 'router', 'goal', 'SWAGGER', 'PostService', PostController];

}());
