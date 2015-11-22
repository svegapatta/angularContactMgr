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