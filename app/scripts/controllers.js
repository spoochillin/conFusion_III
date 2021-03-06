'use strict';

var app = angular.module('ConfusionApp');

app.controller('MenuController', ['$scope','menuFactory', function($scope, menuFactory) {
	$scope.tab = 1;
	$scope.filtText = '';
	$scope.showDetails = false;
	$scope.showMenu = false;
	$scope.message = "Loading . . .";

	//Use the menu factory service to get menu data
	$scope.dishes = menuFactory.getDishes().query(
		function(response){
			$scope.dishes = response;
			$scope.showMenu = true;
		},
		function(response){
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);

	$scope.select = function(setTab) {
		$scope.tab = setTab;
		if (setTab === 2) {
			$scope.filtText = "appetizer";
		}
		else if (setTab === 3) {
			$scope.filtText = "mains";
		}
		else if (setTab === 4) {
			$scope.filtText = "dessert";
		}
		else {
			$scope.filtText = "";
		}
	};
	$scope.isSelected = function (checkTab) {
		return (this.tab === checkTab);
	};

	$scope.toggleDetails = function(){
		$scope.showDetails = !$scope.showDetails;
	};
}]);

/* Controller for whole contact us page */
app.controller('ContactController', ['$scope', function($scope) {
	$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
	var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
	$scope.channels = channels;
	$scope.invalidChannelSelection = false;
}]);

/* Controller for contact us page feedback form */
app.controller('FeedbackController', ['$scope', function($scope) {
	$scope.sendFeedback = function() {
		console.log($scope.feedback);
		if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
			$scope.invalidChannelSelection = true;
			console.log('incorrect');
		}
		else {
			$scope.invalidChannelSelection = false;
			$scope.feedback = {mychannel:"", firstName:"", lastName:"",
							   agree:false, email:"" };
			$scope.feedback.mychannel="";

			$scope.feedbackForm.$setPristine();
			console.log($scope.feedback);
		}
	};
}]);

/* Controller for dish sorting */
app.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
	$scope.frule = '';
	$scope.predicate = '';
	$scope.reverse = false;
	//Function to change tab index on ng-click
	$scope.textCh = function() {
		if ($scope.frule.indexOf("-") === 0) {
			$scope.reverse = true;
		}

		if ($scope.frule.indexOf("author") > -1) {
			$scope.predicate = "author";

		}else if ($scope.frule.indexOf("date") > -1) {
			$scope.predicate = "date";

		}else if ($scope.frule.indexOf("rating") > -1) {
			$scope.predicate = "rating";
		}
	};

	$scope.showDish = false;
	$scope.message = "Loading . . .";
	// Extract id of dish which the user clicked
	$scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
		function(response){
			$scope.dish = response;
			$scope.showDish = true;
		},
		function(response){
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);
	
}]);

/* Controller for Dist comments after clicking a menu pic */
app.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
	//Object to hold the comment from the form
	$scope.comment = {author:"", rating:5, comment:"", date:""};

	$scope.submitComment = function () {
		$scope.comment.date = new Date().toISOString();
		//console.log($scope.comment);
		$scope.dish.comments.push($scope.comment);
		menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
		$scope.commentForm.$setPristine();
		$scope.comment = {author:"", rating:5, comment:"", date:""};
	};
}]);

/* Controller for Index page */
app.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory',  function($scope, menuFactory, corporateFactory){
	$scope.showDish = true;
	$scope.message = "Loading . . .";
	$scope.dish = menuFactory.getDishes().get({id:0}).$promise.then(
		function(response){
			$scope.dish = response;
			$scope.showDish = true;
		},
		function(response){
			$scope.message = "Error: " + response.status + " " + response.statusText;
		}
	);
	
	$scope.promotion = menuFactory.getPromotion(0);
	$scope.chef = corporateFactory.getLeader(3);
	
}]);

/* Controller for aboutsus page */
app.controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function($scope, $stateParams, corporateFactory){
	$scope.corporates = corporateFactory.getLeaders();
	
}]);



