angular.module('vss')
.service('modalService', [ '$uibModal', function($uibModal) {

	var modalDefaults = {
			backdrop : true,
			keyboard : true,
			modalFade : true,
			templateUrl : contextPath + '/vss/html/confirmationModal.html'
	};

	var modalOptions = {
			closeButtonText : 'Close',
			actionButtonText : 'OK',
			headerText : 'Proceed?',
			bodyText : 'Perform this action?',
			headerType : "",
			glyphicon : ""
	};

	this.showModal = function(customModalDefaults, customModalOptions) {
		if (!customModalDefaults)
			customModalDefaults = {};
		customModalDefaults.backdrop = 'static';
		return this.show(customModalDefaults, customModalOptions);
	};

	this.show = function(customModalDefaults, customModalOptions) {
		//Create temporary  objects to work with since we're in a singleton service
		var tempModalDefaults = {};
		var tempModalOptions = {};

		//Map angular-ui modal custom defaults to modal defaults defined in service
		angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

		if(customModalOptions.headerType != undefined){
			if(customModalOptions.glyphicon == undefined){
				switch(customModalOptions.headerType) {
				case "warning":
					customModalOptions.glyphicon = "glyphicon glyphicon-alert";
					break;
				case "success":
					customModalOptions.glyphicon = "glyphicon glyphicon-ok-sign";
					break;
				case "danger":
					customModalOptions.glyphicon = "glyphicon glyphicon-fire";
					break;
				case "info":
					customModalOptions.glyphicon = "glyphicon glyphicon-info-sign";
					break;
				default:
					break;
				}
			}
			customModalOptions.headerType = "modal-header-" + customModalOptions.headerType;
		}

		//Map modal.html $scope custom properties to defaults defined in service
		angular.extend(tempModalOptions, modalOptions, customModalOptions);

		if (!tempModalDefaults.controller) {
			tempModalDefaults.controller = function($scope, $uibModalInstance) {
				$scope.modalOptions = tempModalOptions;
				$scope.data = tempModalOptions.data;
				$scope.modalOptions.ok = function(result) {
					$uibModalInstance.close(result);
				};
				$scope.modalOptions.close = function(result) {
					$uibModalInstance.dismiss('cancel');
				};
			}
		}

        return $uibModal.open(tempModalDefaults).result;
    };
}]).service('PermissionService', ['$q', '$filter', 'ConfigRestService', 'Lock',
    function PermissionService($q, $filter, ConfigRestService, Lock) {

        var REQUEST_LOCK = 'PermissionService.LOCK_KEY';

        /**
         * Function that returns a promise to check if the user
         * has the required permissions as requested
         */
        function isAllowedPromise(requiredPermissions) {
            // simultatiouns attempts to get the same data
            return Lock.getLock(REQUEST_LOCK)
                .then(function onGotLock() {

                    // A promise to go get the permissions
                    var promise = $q.when(ConfigRestService.isAllowed(requiredPermissions));

                    // return the lock
                    return promise.then(function success(data) {
                        return Lock.returnLock(REQUEST_LOCK, data);
                    }, function failed(reason) {
                        // Return the lock and keep rejecting the chain
                        Lock.returnLock(REQUEST_LOCK);
                        return $q.reject(reason);
                    });
                });
        }

        return {
            isAllowedPromise: isAllowedPromise
        }
}]);
