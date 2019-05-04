'use strict';

	var vss_english = {
			'LOG_IN': 'Log in',
			'LOG_OUT': 'Log out',
			'YES': 'Yes',
			'NO': 'No',
			'CANCEL': 'Cancel',
			'MENU_HOME': 'Home',
			'MENU_REPORTS': 'Reports',
			'MENU_SYSTEM': 'System',
        	'USER_MSG': 'You are logged in as',
        	'USER_CNF_TITLE': 'Use a different User Code?',
        	'USER_CNF_MSG': 'You\'re about switch to another User Code. Do you want to continue?',
        	'DB_MSG': 'You are connected to database',
			'DB_CNF_TITLE': 'Change Database?',
			'DB_CNF_MSG': 'You\'re about switch to another database. Do you want to continue?',
			'LANG_MSG': 'Your language preference is set to',
			'LANG_CNF_TITLE': 'Change Language?',
			'LANG_CNF_MSG': 'You\'re about switch to another language. Do you want to continue?',
	};
	
	var vss_afrikaans = {
			'LOG_IN': 'Teken in',
			'LOG_OUT': 'Teken uit',
			'YES': 'Ja',
			'NO': 'Nee',
			'CANCEL': 'Kanseleer',
			'MENU_HOME': 'Tuis',
			'MENU_REPORTS': 'Verslae',
			'MENU_SYSTEM': 'Sisteem',
			'USER_MSG': 'U is ingeteken as',
			'USER_CNF_TITLE': 'Wil U \'n ander Gebruikers Kode gebruik?',
			'USER_CNF_MSG': 'U is op die punt om oor te skakel na \'n ander Gebruikers Kode. Wil U voortgaan?',
			'DB_MSG': 'U is gekoppel aan databasis',
			'DB_CNF_TITLE': 'Verander Databasis?',
			'DB_CNF_MSG': 'U is op die punt om oor te skakel na \'n ander databasis. Wil U voortgaan?',
			'LANG_MSG': 'U taal voorkeur is',
			'LANG_CNF_TITLE': 'Verander Taal?',
			'LANG_CNF_MSG': 'U is op die punt oor te skakel na \'n ander taal. Wil U voortgaan?',
	}
	
	// Define the infrastructure module
	angular.module("vss", ['ngSanitize', 'pascalprecht.translate', 'selector'])
	.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.translations('en_ZA', {
    	  'VSS': vss_english 
      });
      
      $translateProvider.translations('af_ZA', {
    	  'VSS': vss_afrikaans 
      });
     
      $translateProvider.useSanitizeValueStrategy(null);
      $translateProvider.preferredLanguage('en_ZA');
    }]);
