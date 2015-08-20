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
      all: _all,
      create: _create
    };
    return svcInterface;

    /**
     * Private
     */
    function _all() {
      return Contacts.getList();
    }

    function _create(contact) {
      return Contacts.post(contact);
    }
  }

  module.exports = ['api', 'EVENTS', 'API_URL', ContactService];

}());
