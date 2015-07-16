(function() {
  'use strict';

  var debug = require('debug')('waybook:PostService');

  function PostService(api, POST_TYPES, embedly) {

    var svcInterface, Posts, postType, User, userObj;

    Posts = api.all('posts');
    postType = null;

    /**
     * Public
     */
    svcInterface = {
      setPostType: _setPostType,
      // create: _create,
      // collection: _collection,
      // reset: _reset,
      extractLink: _extractLink
    };
    return svcInterface;

    /**
     * Private
     */


    function _reset() {

    }

    function _setPostType(type) {
      postType = type;
    }

    function _extractLink(url) {
      return embedly.one('extract').get({'url': url});
    }


  }

  module.exports = ['api', 'POST_TYPES', 'embedly', PostService];

}());
