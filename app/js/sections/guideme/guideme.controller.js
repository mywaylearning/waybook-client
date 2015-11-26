function GuideMeController($scope, $state, tasks) {
  'ngInject';

  var stateMap = {
    'goal': {
      state: 'app.main.type',
      params: {
        type: 'goal'
      }
    },
    'thought': {
      state: 'app.main.type',
      params: {
        type: 'thought'
      }
    },
    'discovery': {
      state: 'app.main.type',
      params: {
        type: 'discovery'
      }
    },
    'resource': {
      state: 'app.main.type',
      params: {
        type: 'resource'
      }
    },
    'unite': {
      state: 'app.unite.add',
      params: {}
    }
  };

  angular.forEach(tasks, function(task) {
    task._completed = task.completed;
  });

  $scope.openTask = function(event, task) {
    var state;
    var params;

    event.preventDefault();
    event.stopPropagation();

    if (task.completed) {
      return;
    }

    state = stateMap[task.section].state;
    params = stateMap[task.section].params;

    params.tags = task.tags;

    $state.go(state, params, {});
  };

  $scope.viewData = {
    tasks: tasks
  };
}

module.exports = GuideMeController;
