(function() {
  'use strict';

  var debug = require('debug')('waybook:GoalService');

  function CommentService(api, EVENTS, API_URL) {

    var svcInterface, Comments;

    Comments = api.all('comments');

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
  }

  module.exports = ['api', 'EVENTS', 'API_URL', CommentService];

}());
