(function(){
	
	'use strict';
	
	angular.module('angularMgr').filter('phoneFormat', function() {
	  return function(input) {
		if(input !== undefined && input !== ''){
			return input.substr(0,3) + '-' + input.substr(3,3) + '-' + input.substr(6,4);
		}
		return '';
	  };
	});

})();