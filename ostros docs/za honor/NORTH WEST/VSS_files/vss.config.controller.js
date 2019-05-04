(function(angular) {

	// Define the vss module
	angular.module("vss")

	/**
	 * Controller for the Navigation Bar
	 */
	.controller("VssConfigController", [ "$scope", "$translate", "ConfigRestService", "modalService", 
	                                      function($scope, $translate, ConfigRestService, modalService) {

		$scope.changeLanguage = function (langKey) {
		
			var langCodeId = 2;
			if(langKey == 'en_ZA') {
				langCodeId = 3;
			}
			
			var modalOptions = { headerType: "warning" };			
			$translate(['VSS.CANCEL', 'VSS.YES', 'VSS.LANG_CNF_TITLE', 'VSS.LANG_CNF_MSG']).then(function (translations) {
				
				modalOptions.closeButtonText = translations['VSS.CANCEL'];
				modalOptions.actionButtonText = translations['VSS.YES'];
				modalOptions.headerText = translations['VSS.LANG_CNF_TITLE'];
				modalOptions.bodyText = translations['VSS.LANG_CNF_MSG'];
				
				return modalService.showModal({}, modalOptions).then(function (result) {
		    		ConfigRestService.language(langCodeId).then(function(){
		    			$scope.context.userLangCodeID = langCodeId;
		    			
		    			$translate.use(langKey);
		    			$scope.context.userLocale = $translate.proposedLanguage();
		    		});
		    	});
			});	    	
		};
		
		$scope.changeDatabase = function(database){ 	
			
			var modalOptions = { headerType: "warning" };			
			$translate(['VSS.CANCEL', 'VSS.YES', 'VSS.DB_CNF_TITLE', 'VSS.DB_CNF_MSG']).then(function (translations) {
				
				modalOptions.closeButtonText = translations['VSS.CANCEL'];
				modalOptions.actionButtonText = translations['VSS.YES'];
				modalOptions.headerText = translations['VSS.DB_CNF_TITLE'];
				modalOptions.bodyText = translations['VSS.DB_CNF_MSG'];
				
				return modalService.showModal({}, modalOptions).then(function (result) {
		    		ConfigRestService.database(database).then(function(){
                        if(database.startsWith("@")){
                            database = database.substring(1);
                        }
                        $scope.context.dbname = database;
		    		});
		    	});
			});
	    };

		$scope.changeUserCode = function(userCode){

		  var modalOptions = { headerType: "warning" };
		  $translate(['VSS.CANCEL', 'VSS.YES', 'VSS.USER_CNF_TITLE', 'VSS.USER_CNF_MSG']).then(function (translations) {

			  modalOptions.closeButtonText = translations['VSS.CANCEL'];
			  modalOptions.actionButtonText = translations['VSS.YES'];
			  modalOptions.headerText = translations['VSS.USER_CNF_TITLE'];
			  modalOptions.bodyText = translations['VSS.USER_CNF_MSG'];

			  return modalService.showModal({}, modalOptions).then(function (result) {
				  ConfigRestService.user(userCode).then(function(){
					  $scope.context.userCode = userCode;
				  });
			  });
		  });
		};

		$scope.normaliseDBName = function(selectedDB){
            if(selectedDB.startsWith("@")){
                selectedDB = selectedDB.substring(1);
            }
			return selectedDB;
		}
		
		ConfigRestService.databases().then(function(databases){
			$scope.databases = databases;
		});
		
	} ]);
})(angular);