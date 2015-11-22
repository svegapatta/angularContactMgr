(function(){
	
	'use strict';
	
	angular.module('angularMgr').controller('mgrCtrl',mgrCtrl);
	
	mgrCtrl.$inject = ['$location','mgrService','$filter','logger'];
	
	function mgrCtrl($location,mgrService,$filter,logger){
		
		//private
		/*jshint validthis:true */
		var vm = this,
			deleteMgrObj = {};
		
		//methods
		init();
		vm.createContact = createContact;
		vm.deleteMgr = deleteMgr;
		vm.onDeleteMgr = onDeleteMgr;
		vm.editMgr = editMgr;
		
		function editMgr(mgr){
			mgrService.setEditItem(mgr);
			$location.path('/edit');
		}
		
		function onDeleteMgr(){
			vm.mgrList.forEach(function(item, index) {
				if(item.id === deleteMgrObj.id) {
				  vm.mgrList.splice(index, 1);
				  logger.log('success','',item.name + ' deleted successfully');
				}    
			});
		}
		
		function deleteMgr(mgr){
			deleteMgrObj = mgr;
		}
		
		function createContact(){
			deleteMgrObj = {};
			$location.path('/create');
		}
		
		function init(){
			vm.mgrList = mgrService.getMgrList();
		}
	}
	
})();