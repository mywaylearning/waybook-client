angular.module('stateBackButtonIonic', [])
.config(function($provide) {
	$provide.decorator('$ionicHistory', function($delegate) {
		var registerFunction = $delegate.register;

		$delegate.register = function($scope, viewLocals) {
			var rsp = registerFunction.apply(this, arguments);

			// If there is a navigable parent state then override Ionic and set
			// the back button to visable
			if (!rsp.enableBack && !viewLocals.$$state.parent.self.abstract) {
				rsp.enableBack = true;
			}

			return rsp;
		};
		return $delegate;
	});
})
.directive('stateNavBackButton', function($ionicHistory, $ionicViewSwitcher, $state) {
	return {
		restrict: 'A',
		priority: 10,
		compile: function(tElement, tAttrs) {
			tAttrs.$set('ngClick', 'customStateBack()');

			return function(scope) {
				scope.customStateBack = function() {
            console.log($state, $state.$current.parent.navigable)
					if ($ionicHistory.backView()) {
						$ionicHistory.goBack();
					} else if (!!$state.$current.parent.navigable) {
						$ionicHistory.nextViewOptions({
							disableBack: true,
							historyRoot: false
						});
						$ionicViewSwitcher.nextDirection('back');

						$state.go('^');
					}
				};
			};
		}
	};
});
