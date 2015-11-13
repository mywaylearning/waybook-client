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
      create: _create,
      getById: _getById
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

    function _getById(id) {
      return api.one('contacts', id).get();
    }
  }

  module.exports = ['api', 'EVENTS', 'API_URL', ContactService];

}());
