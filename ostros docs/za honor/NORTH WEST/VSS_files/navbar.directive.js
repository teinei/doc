(function(angular) {
	angular.module("vss")

	/**
	 * Directive to show navigation bar
	 */
	.directive("navBar", [ "ConfigRestService", "$location", "$translate", 
	                       function(ConfigRestService, $location, $translate) {
		return {
			'restrict' : 'E',
			'scope' : {
				context: '=ngModel'
			},
			'templateUrl' : contextPath + '/vss/html/navBar.html',
			'link' : function(scope, element, attr) {
				
				scope.status = "label-default";
				ConfigRestService.properties().then(function(properties){
					scope.properties = properties;
					if(properties.Environment == 1){
						scope.status = "label-danger";
					} else if (properties.Environment == 2){
						scope.status = "label-warning";
					} else if (properties.Environment == 3){
						scope.status = "label-info";
					} else if (properties.Environment == 4){
						scope.status = "label-success";
					} 
				});

				scope.contextPath = contextPath;
				scope.isAuthenticated = false;
				ConfigRestService.logonuser().then(function(logonuser){
					scope.logonuser = logonuser;
					// If the webUserLoginName is not null, then we have an authenticated user
					scope.isAuthenticated = logonuser.webUserLoginName != null;
				});
				
			}
		};
	} ]);
})(angular);