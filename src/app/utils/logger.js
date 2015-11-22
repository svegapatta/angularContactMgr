(function () {
    'use strict';

    angular.module('angularMgr').factory('logger', Logger);

    Logger.$inject = ['toaster'];

    function Logger(toaster) {
        var service = {
            log: log
        };
        return service;
		
		/*accoding to type values, this will display different alerts*/
		function log(type,title,text){
			toaster.pop(type,title,text);
		}
    }
})();
