'use strict';

	// Define the infrastructure module
	angular.module("aaa", ['vss', 'ngRoute', 'ngResource', 'ngIdle', 'ngSanitize', 'ui.bootstrap', 'ui-notification', 
	                           'pascalprecht.translate', 'blockUI'])
	
	.config(['$routeProvider', function($routeProvider) { 
		
	}])
	/**
	 * An object representing the application function that the user is currently
	 * busy with. This should be set on each page change to ensure that the correct
	 * Application function is currently active
	 */
	.provider('ApplicationFunction', function ApplicationFunctionProvider() {

		var AppFunction = {
			applicationId : "unknown",
			functionId : "unknown"
		}
		this.update = function(appId, funcId){
			AppFunction.applicationId = appId;
			AppFunction.functionId = funcId;
			return AppFunction;
		}

		this.$get = [function createApplicationFunction() {
			return AppFunction;
		}];
	})
	.run(['Idle', function(Idle) {
		Idle.watch();
	}])
	.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
		IdleProvider.idle(1200);
		IdleProvider.timeout(30);
		KeepaliveProvider.interval(10);
	}])
	.value('locationParser', function(responseHeaders) {
		// Get the Location header and parse it.
		var locationHeader = responseHeaders('Location');
		var fragments = locationHeader.split('/');
		var id = fragments[fragments.length - 1];
		return id;
	})
	.config(['$translateProvider', function ($translateProvider) {
		$translateProvider.translations('en_ZA', {
			'TITLE': 'Applications and Admissions',
			'VSS': vss_english,
			'STR': {}
		});
	      
		$translateProvider.translations('af_ZA', {
			'TITLE': 'Aansoeke en Toelatings',
			'VSS': vss_afrikaans,
			'STR': {}
		});
     
		$translateProvider.useSanitizeValueStrategy(null);
		$translateProvider.preferredLanguage('en_ZA');
    }])
    .config(function(blockUIConfig) {

    	// Change the default delay to 100ms before the blocking is visible
    	blockUIConfig.delay = 100;
    	
    	// Disable automatically blocking of the user interface
    	blockUIConfig.autoBlock = false;

    })
    .config(function(NotificationProvider) {

    	// Change the default delay of fading out 
    	NotificationProvider.setOptions({ delay: 20000});

    });
