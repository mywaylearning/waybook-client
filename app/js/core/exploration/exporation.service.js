function ExplorationService(api) {
  'ngInject';

  var svcInterface;
  var Explorations;
  var Categories;

  // Private methods
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

  function _getExplorationResults(exploration) {
    return api.one('explorations', exploration.slug).get({
      results: true,
      explorationId: exploration.id
    });
  }

  function _createPostWithResults(exploration) {
    return api.one('explorations', exploration.id).customPUT({ shareResults: true });
  }


  Explorations = api.all('explorations');
  Categories = api.all('categories');

  svcInterface = {
    getCategories: _getCategories,
    collection: _collection,
    getBySlug: _getBySlug,
    answerExplorationQuestion: _answerExplorationQuestion,
    getExplorationResults: _getExplorationResults,
    createPostWithResults: _createPostWithResults
  };

  return svcInterface;
}

module.exports = ExplorationService;
