(function() {
  'use strict';

  var debug = require('debug')('waybook:TagService');

  function TagService(api, EVENTS, API_URL) {

    var svcInterface, Tags;

    Tags = api.all('tags');

    /**
     * Public
     */
    svcInterface = {
      collection: _collection,
    };
    return svcInterface;

    /**
     * Private
     */

    function _collection(search) {
      debug('in _collection');
      return Tags.getList({search: search});
    }
  }

  module.exports = ['api', 'EVENTS', 'API_URL', TagService];

}());
