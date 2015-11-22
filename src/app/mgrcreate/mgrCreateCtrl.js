(function(){
	
	'use strict';
	
	angular.module('angularMgr').controller('mgrCreateCtrl',mgrCreateCtrl);
	
	mgrCreateCtrl.$inject = ['$location','mgrService','logger'];
	
	function mgrCreateCtrl($location,mgrService,logger){
		
		/*jshint validthis:true */
		var vm = this;
		
		init();
		vm.createMgr = createMgr;
		vm.cancel = cancel;
		
		function init(){
			var item = mgrService.getEditItem();
			vm.id = item.id;
			vm.name = item.name;
			vm.phone = item.phone;
			vm.email = item.email;
		}
		
		function cancel(){
			mgrService.cancelMgr();
			$location.path('/');
		}
		
		function createMgr(id,name,email,phone){
			if(id !== undefined){
				mgrService.updateMgr(id,name,email,phone);
				logger.log('success','', name + ' updated successfully');
			}else{
				mgrService.createMgr(name,email,phone);
				logger.log('success','', name + ' created successfully ');
			}
			
			$location.path('/');
		}
	}
	
})();