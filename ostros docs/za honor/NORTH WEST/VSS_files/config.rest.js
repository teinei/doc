(function(angular) {
	angular.module("vss")

	/**
	 * Rest service client for the ConfigRestService
	 */
	.factory("ConfigRestService", [ "vssRestServiceBase", function(vssRestServiceBase) {
		return angular.extend({
			'principal' : function() {
				return this._callService('GET', 'config/principal');
			},
			'logonuser' : function() {
				return this._callService('GET', 'config/logonuser');
			},
			'context' : function() {
				return this._callService('GET', 'config/context');
			},
			'language' : function(language) {
				return this._callService('PUT', 'config/context/language/' + language);
			},
			'database' : function(database) {
				return this._callService('PUT', 'config/context/database/' + database);
			},
			'properties' : function() {
				return this._callService('GET', 'config/properties');
			},
			'databases' : function() {
				return this._callService('GET', 'config/databases');
			},
			'user' : function(userCode) {
				return this._callService('PUT', 'config/context/user/' + userCode);
			},
			'logout' : function() {
				return this._callService('GET', 'config/logout');
			},
            'isAllowed' : function(functionIds) {
                return this._callService('GET', 'config/isAllowed/' + functionIds);
            }
		}, vssRestServiceBase);

	} ])

})(angular);