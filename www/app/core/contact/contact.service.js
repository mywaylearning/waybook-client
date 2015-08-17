(function() {
  'use strict';

  var debug = require('debug')('waybook:ContactService');

  function ContactService(api, EVENTS, API_URL) {

    var svcInterface, Contacts;

    Contacts = api.all('contacts');

    /**
     * Public
     */
    svcInterface = {
      all: _all
    };
    return svcInterface;

    /**
     * Private
     */
    function _all() {
      return Contacts.getList();
    }
  }

  module.exports = ['api', 'EVENTS', 'API_URL', ContactService];

}());
