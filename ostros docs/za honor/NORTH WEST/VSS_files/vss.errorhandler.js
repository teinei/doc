(function(angular) {

	angular.module("vss")

	/**
	 * This factory returns a function that will handle a error by displaying an error dialog
	 * The function will also returns a rejected promise, so it can be used in a promise chain
	 */
	.factory("vssErrorHandler", ['$compile', '$rootScope', '$http', '$templateCache', '$timeout', '$q', 'Lock', 'blockUI',
	  function($compile, $rootScope, $http, $templateCache, $timeout, $q, Lock, blockUI) {
		var dialogScope = null;
		var dialogElement = null;
		var LOCK_KEY = 'infErrorHandler.LOCK_KEY';

		function appendDialog(){
			return $http.get(contextPath + '/vss/html/errorDialog.html', {cache : $templateCache})
			.then(function(response) {
				dialogScope = $rootScope.$new(true);
				dialogScope.ponError = {};
				dialogScope.ponError.errorMessage = 'Oops, something bad happened';
				dialogElement = $compile(response.data)(dialogScope);
				$(dialogElement).on('hidden.bs.modal', function(){
					Lock.returnLock(LOCK_KEY);
				});
				$("body").append(dialogElement);
			});
		}

		function updateUI(errorReason){
			$timeout(function () {
				// Add the reason's fields to the scope
				dialogScope.ponError = errorReason;
				// The directive isn't executed until the scope runs a digest
				dialogScope.$digest();
				$(dialogElement).modal('show');
			}, 0);
		}

		return function(errorReason){

			return Lock.getLock(LOCK_KEY).then(function(){
				if(dialogScope == null){
					return appendDialog();
				}
			})
			.then(function(){
				blockUI.stop(); // Remove any ui blocking if necessary.
				updateUI(errorReason);
				return $q.reject(errorReason);
			});

		};
	}]);
})(angular);