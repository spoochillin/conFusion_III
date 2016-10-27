'use strict';

var app = angular.module('ConfusionApp', ['ngRoute']);

//Configure routing; handlers and controllers
app.config( ['$routeProvider', function($routeProvider) {
	// route for the contactus page
	$routeProvider.when('/contactus', {
		templateUrl : 'contactus.html',
		controller  : 'ContactController'
	});

	// route for the menu page
	$routeProvider.when('/menu', {
		templateUrl : 'menu.html',
		controller  : 'MenuController'
	});

	// route for the dish details page
	$routeProvider.when('/menu/:id', {
		templateUrl : 'dishdetail.html',
		controller  : 'DishDetailController'
	});

	// Default: Change to home later...
	$routeProvider.otherwise('/contactus');
}]);
