(function(angular) {

	var getQueryStringValue = function (key, defaultValue) {  
        if (document.location.search && document.location.search.length > 0) {
            var arr = document.location.search.split(key + '=')[1];
            console.log('arr', arr);
            if (arr && arr.length > 0) {
                return arr.split('&')[0];
            } else {
                return defaultValue;
            }
        } else {
            return defaultValue;
        }
    };

	// create module 'githubViewer'
	var app = angular.module('Main', 
		[
			'ngRoute', 
			'ngAnimate', 
			'ui.bootstrap'
		]).run(function($rootScope) {
			$rootScope.brand = getQueryStringValue('brand', 'dd');
			$rootScope.lang = getQueryStringValue('lang', 'Eng');
			$rootScope.reportId = getQueryStringValue('reportId', 'learning-path');

			console.log('brand/lang/reportID', {
				'document.location.search': document.location.search,
				brand: $rootScope.brand,
				lang: $rootScope.lang,
				reportId: $rootScope.reportId
			});

			if (($rootScope.brand && $rootScope.brand.toLowerCase()) === 'br') {
				console.log('set stylesheet href attribute');
				document.getElementById('mainCss').setAttribute('href', 'css/main-br.css');
			}
		});
	
	// configure
	app.config([
		'$routeProvider',
		function($routeProvider) {
		
			$routeProvider
				.when('/', {
					templateUrl: 'views/report.html',
					controller: 'reportController'
				})
				.otherwise({
					redirectTo: '/'
				});
		}]);
	
	// register services with angular
    app.factory('utilsService', [services.utilsService]);
	app.factory('dataService', ['$http', services.dataService]);
	app.factory('undoServiceFactory', [services.serviceFactory]);
	app.factory('reportService', ['utilsService', services.reportService]);

	// register controllers
	app.controller('reportController', [
		'$scope', 
		'utilsService',
		'undoServiceFactory', 
		'dataService', 
		'reportService', 
		'$timeout',
		'$interval',
		controllers.reportController]);

}(window.angular));
