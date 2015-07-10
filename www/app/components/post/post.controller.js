(function() {

  'use strict';

  var debug = require('debug')('waybook:PostController');

  function PostController($scope, router, goal, SWAGGER, PostService) {
    debug('here we are (directive controller)');

    debug(SWAGGER);

    var ctrl = this;

    function init() {
      // Define type of post mode (show form)
      ctrl.postMode = 'link';

      // Other definitions
      ctrl.placeHolder = "Share something...";

      debug('type...? ' + ctrl.postType);
    }
    init();

    $scope.$watch('ctrl.postMode', function(newValue) {
      if (newValue === false) {
        ctrl.extractLinkUrl = null;
        ctrl.extractResult = null;
      }
    });

    ctrl.extractLink = function() {
      PostService.extractLink(ctrl.extractLinkUrl).then(function(result){
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
      });
    };




    ctrl.model = {
      title: 'New Goal'
    };




    ctrl.save = function() {
      debug('saving...', ctrl.model);
      goal.create(ctrl.model);
    };

  }

  module.exports = ['$scope', 'router', 'goal', 'SWAGGER', 'PostService', PostController];

}());
