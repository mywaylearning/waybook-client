(function() {
  'use strict';

  var debug = require('debug')('waybook:PostService');

  function PostService(api, embedly) {

    var svcInterface, Posts;

    Posts = api.all('posts');

    /**
     * Public
     */
    svcInterface = {
      create: _create,
      collection: _collection,
      collectionByPostType: _collectionByPostType,
      getById: _getById,
      extractLink: _extractLink
    };
    return svcInterface;

    /**
     * Private
     */
     function _create(post) {
       return Posts.post(post);
     }

     function _collection() {
       return Posts.getList();
     }

     function _collectionByPostType(postType) {
       return Posts.getList({postType: postType});
     }

     function _getById(id, shares) {
       var _shares = {};

       if (shares) {
         _shares.shared = true;
       }

       return api.one('posts', id).get(_shares);
     }

    function _extractLink(url) {
      return embedly.one('extract').get({'url': url});
    }


  }

  module.exports = ['api', 'embedly', PostService];

}());
