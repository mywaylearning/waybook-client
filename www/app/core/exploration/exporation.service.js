(function() {
  'use strict';

  function ExplorationService($q, api, EVENTS) {

    var svcInterface, Explorations, Exploration, Categories;

    Explorations = api.all('explorations');
    Exploration = api.one('explorations');
    Categories = api.all('categories');

    svcInterface = {
      getCategories: _getCategories,
      collection: _collection,
      getBySlug: _getBySlug,
      answerExplorationQuestion: _answerExplorationQuestion
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
    }

    function _answerExplorationQuestion(obj) {
      var answer = angular.extend(api.one('explorations'), obj);
      return answer.put();
    }

  };

  module.exports = [
    '$q',
    'api',
    'EVENTS',
    ExplorationService
  ];
}());
