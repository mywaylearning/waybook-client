function TagService(api) {
  'ngInject';

  var svcInterface;
  var Tags = api.all('tags');

  /**
   * Private
   */

  function _collection(search) {
    return Tags.getList({ search: search });
  }

  function _timeline() {
    return Tags.getList({ timeline: true });
  }

  /**
   * Public
   */
  svcInterface = {
    collection: _collection,
    timeline: _timeline
  };
  return svcInterface;
}

module.exports = TagService;
