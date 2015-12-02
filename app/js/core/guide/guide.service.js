function GuideService(api) {
  'ngInject';

  var Tasks = api.all('/guide');

  /**
   * Private
   */
  function _collection() {
    return Tasks.getList();
  }

  return {
    collection: _collection
  };
}

module.exports = GuideService;
