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