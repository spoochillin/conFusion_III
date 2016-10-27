'use strict';

var app = angular.module('ConfusionApp', ['ui.router']);

// Set the config for states and URLS
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	// route for the home page with 3 views header, content and footer
	$stateProvider.state('app', {
		url:'/',
		views: {
			'header': {
				templateUrl : 'views/header.html'
			},
			'content': {
				template : '<h1>To be Completed</h1>',
				controller  : 'IndexController'
			},
			'footer': {
				templateUrl : 'views/footer.html'
			}
		}
	});
	// route for the aboutus page nested in app state so use @ to specify
	// the view that is being modified
	$stateProvider.state('app.aboutus', {
		url:'aboutus',
		views: {
			'content@': {
				template: '<h1>To be Completed</h1>',
				controller  : 'AboutController'
			}
		}
	});
	// route for the contactus page
	$stateProvider.state('app.contactus', {
		url:'contactus',
		views: {
			'content@': {
				templateUrl : 'views/contactus.html',
				controller  : 'ContactController'
			}
		}
	});

	// route for the menu page
	$stateProvider.state('app.menu', {
		url: 'menu',
		views: {
			'content@': {
				templateUrl : 'views/menu.html',
				controller  : 'MenuController'
			}
		}
	});

	// route for the dishdetail page
	$stateProvider.state('app.dishdetails', {
		url: 'menu/:id',
		views: {
			'content@': {
				templateUrl : 'views/dishdetail.html',
				controller  : 'DishDetailController'
			}
		}
	});
	
	// Default case
	$urlRouterProvider.otherwise('/');
}]);