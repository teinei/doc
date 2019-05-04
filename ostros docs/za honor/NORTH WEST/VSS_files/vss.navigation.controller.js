(function(angular) {

	// Define the vss module
	angular.module("vss")

	/**
	 * Controller for the task list
	 */
	.controller('NavController', function NavController($scope, Idle, Keepalive, $modal, $window, ConfigRestService, $translate) {
			
		ConfigRestService.context().then(function(context){
			$scope.context = context;
			$translate.use(context.userLocale);
		});
		
		function closeModals() {
			if ($scope.warning) {
				$scope.warning.close();
				$scope.warning = null;
			}
		}

		$scope.$on('IdleStart', function() {
			closeModals();
			
			ConfigRestService.logonuser().then(function(logonuser){
				$scope.logonuser = logonuser;
				// If the webUserLoginName is not null, then we have an authenticated user
				var isAuthenticated = logonuser.webUserLoginName != null;
				if (isAuthenticated) {
					$scope.warning = $modal.open({
						templateUrl: contextPath + '/vss/html/timeout-warning.html',
						windowClass: 'modal-danger'
					});
				}
			});
			
		});

		$scope.$on('IdleEnd', function() {
			closeModals();
			ConfigRestService.principal().then(function() {
				// don't want to do anything really, just wanted to wake up the server :).
			});
		});

		$scope.$on('IdleTimeout', function() {
			closeModals();
			ConfigRestService.logout().then(function() {
				$window.location.href = contextPath;
			});
		});

	});
})(angular);