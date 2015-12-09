function SearchService(api) {
  'ngInject';

  var Result = api.one('search');

  function _collection(query, type, owner) {
    var search = {
      tag: query.replace('#', ''),
      type: type,
      owner: owner
    };

    return Result.customGET(null, search);
  }

  return {
    collection: _collection
  };
}

module.exports = SearchService;
