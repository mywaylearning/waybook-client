(function() {
  'use strict';

  function ExplorationService($q, api, EVENTS) {

    var svcInterface, Explorations;

    var Explorations = api.all('explorations');
    var Categories = api.all('categories');

    var svcInterface = {
      getCategories: _getCategories,
      collection: _collection,
      getBySlug: _getBySlug
    };

    return svcInterface;

    // Provate methods
    function _getCategories() {
      return Categories.getList();
    }

    function _collection() {
      return Explorations.getList();
    }

    function _getBySlug(slug) {
      return api.one('explorations', slug).get();
    };

  };

  module.exports = [
    '$q',
    'api',
    'EVENTS',
    ExplorationService
  ];
}());
