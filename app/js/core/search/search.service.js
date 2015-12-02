function SearchService(api) {
  'ngInject';

  var Result = api.one('search');

  function _collection(query) {
    return Result.customGET(null, query);
  }

  return {
    collection: _collection
  };
}

module.exports = SearchService;
