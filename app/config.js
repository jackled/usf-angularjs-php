'use strict';
/* spa configuration */
usfTemplateApp
	.constant('UsfCAStokenAuthConstant', {
		'debug': false,
		'applicationUniqueId': 'f6765e988eb32cbda5dcd9ee2673c0a8',
		'applicationResources': {
			AppResourceIdentity: '/api/identity',
			AppResourceOne: '/api/features'
		},
		'unauthorizedRoute': '/unauthorized'
	});