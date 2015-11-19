function PostService(api, embedly) {
  'ngInject';
  var svcInterface;
  var Posts = api.all('posts');

  /**
   * Private
   */
  function _create(post) {
    return Posts.post(post);
  }

  function _collection(postType) {
    var query = {};

    if (postType) {
      query.postType = postType;
    }
    return Posts.getList(query);
  }

  function _getById(id, shares) {
    var _shares = {};

    if (shares) {
      _shares.shared = true;
    }

    return api.one('posts', id).get(_shares);
  }

  function _timelineByTag(tag) {
    var _tag = tag || '';
    return Posts.getList({
      timeline: true,
      tag: _tag
    });
  }

  function _extractLink(url) {
    return embedly.one('extract').get({
      'url': url
    });
  }

  /**
   * Public
   */
  svcInterface = {
    create: _create,
    collection: _collection,
    timelineByTag: _timelineByTag,
    getById: _getById,
    extractLink: _extractLink
  };
  return svcInterface;
}

module.exports = PostService;
