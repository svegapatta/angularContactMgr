(function(){
	angular.module('angularMgr',[
	'ngRoute',
	'toaster',
	'ngAnimate',
	'templateModule'
	])
	.config(function($routeProvider){
	$routeProvider
	.when('/',{
			templateUrl:'mgrview/mgrview.html',
			controller:'mgrCtrl',
			controllerAs:'vm'
	})
	.when('/create',{
			templateUrl:'mgrcreate/create.html',
			controller:'mgrCreateCtrl',
			controllerAs:'vm'
		})
	.when('/edit',{
			templateUrl:'mgrcreate/create.html',
			controller:'mgrCreateCtrl',
			controllerAs:'vm'
		});
	});
})();
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
(function(){
	
	'use strict';
	
	angular.module('angularMgr').factory('mgrService',mgrService);
	
	mgrService.$inject = ['$filter'];
	
	function mgrService($filter){
	
		var mgrList = [{
							id:1,
							name:'Terrence S. Hatfield',
							phone:'1234567890',
							email:'TerrenceSHatfield@rhyta.com',
							image:'app/images/1.jpg'
						},
						{
							id:2,
							name:'Chris M. Manning',
							phone:'1234567890',
							email:'ChrisMManning@dayrep.com',
							image:'app/images/2.jpg'
						},
						{
							id:3,
							name:'Ricky M. Digiacomo',
							phone:'1234567890',
							email:'TerrenceSHatfield@rhyta.com',
							image:'app/images/3.jpg'
						},
						{
							id:4,
							name:'Michael K. Bayne',
							phone:'1234567890',
							email:'TerrenceSHatfield@rhyta.com',
							image:'app/images/4.jpg'
						},
						{
							id:5,
							name:'John I. Wilson',
							phone:'1234567890',
							email:'TerrenceSHatfield@rhyta.com',
							image:'app/images/5.jpg'
						}
						];
		var editItem = {};
		
		var mgrServiceObj = {
			getMgrList : getMgrList,
			setEditItem : setEditItem,
			getEditItem : getEditItem,
			createMgr : createMgr,
			cancelMgr : cancelMgr,
			updateMgr : updateMgr
		};
		return mgrServiceObj;
		
		function updateMgr(id,name,email,phone){
			var singleMgr = $filter('filter')(mgrList, function (item) {return item.id === id;})[0];
			singleMgr.name = name;
			singleMgr.email = email;
			singleMgr.phone = phone;
			cancelMgr();
		}
		
		function cancelMgr(){
			editItem = {};
		}
		
		function createMgr(name,email,phone){
			var id = mgrList.length + 1;
			var mgrObj = {
				id:id,
				name:name,
				phone:phone,
				email:email,
				image:'app/images/'+ id +'.jpg'
			};
			//
			//http://placehold.it/200x150/000/fff
			mgrList.push(mgrObj);
		}
		
		function getEditItem(){
			return editItem;
		}
		
		function setEditItem(mgr){
			editItem = mgr;
		}
		
		function getMgrList(){
			return mgrList;
		}
	}
})();
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
