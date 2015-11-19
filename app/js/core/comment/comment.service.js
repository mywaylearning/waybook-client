function CommentService(api) {
  'ngInject';

  var svcInterface;
  var Comments = api.all('comments');

  /**
   * Private
   */
  function _getById(id) {
    return api.one('comments', id).get();
  }

  function _create(newComment) {
    return Comments.post(newComment);
  }

  function _update(comment) {
    var _comment = angular.extend(api.one('comments'), comment);
    return _comment.put();
  }

  function _delete(id) {
    return api.one('comments', id).remove();
  }

  /**
   * Public
   */
  svcInterface = {
    create: _create,
    update: _update,
    getById: _getById,
    delete: _delete
  };
  return svcInterface;
}

module.exports = CommentService;
