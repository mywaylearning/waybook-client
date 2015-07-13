(function() {

  'use strict';

  var debug = require('debug')('waybook:PostController');

  function PostController($scope, $state, router, goal, SWAGGER, PostService) {
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
          ctrl.model.files = [];
          angular.forEach(Blobs, function(blob){
            // TODO: Add files info (url, mimetype, name?)
          });
          $scope.$apply();
        },
        function(FPError){
          ctrl.postMode = 'text';
          $scope.$apply();
          console.log(FPError.toString());
        });
    };

    $scope.$watch('ctrl.postMode', function(newValue) {
      if (newValue === false) {
        ctrl.extractLinkUrl = null;
        ctrl.extractResult = null;
      }
    });

    ctrl.extractLink = function() {
      if (!ctrl.extractLinkUrl) {
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

  module.exports = ['$scope', '$state', 'router', 'goal', 'SWAGGER', 'PostService', PostController];

}());
