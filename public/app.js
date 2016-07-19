"use strict";
	var app = angular.module('scrumApp', []);

	app.controller('goalsCtrl', function($scope, $http, showFields, userData){
		$scope.showGoals = function(){return showFields.showGoals;};
		$scope.teamGoals = [];
		$scope.teamMembers = [];
	});

	app.controller('teamCtrl', function($scope, $http, showFields, userData){
		$scope.showTeam = function(){ return showFields.showTeam;};
		// $scope.joinTeam = function(){
		// 	$http({
		// 		method: 'GET',
		// 		url: '/register',
		// 		params: {username: userData.username, password: userData.password, teamName: $scope.teamName}
		// 	}).then(function successCallback(data){
		// 		console.log(data);
		// 	}, function errorCallback(error){
		// 		console.error(error);
		// 	});
		// };
	});

	app.controller('entranceCtrl', function($scope, $http, showFields, userData){
		$scope.loginError = '';
		$scope.registerError = '';
		$scope.newPassword = '';
		$scope.newUsername = '';
		$scope.showEntrance = function(){return showFields.showEntrance;};

		$scope.registerUser = function(){
			$http({
				method: 'POST',
				url: '/register',
				params: {username: $scope.newUsername, password: $scope.newPassword}
			}).then(function successCallback(data){
				userData.username = $scope.newUsername;
				userData.userID = data.data.rows[0].id;
				showFields.showEntrance = false;
				showFields.showTeam = true;
			}, function errorCallback(error){
				console.log("The Error of POST is firing...");
			})
		};

		$scope.checkUsername = function(){
			$scope.registerError = '';
			if($scope.newUsername.length < 3){
				$scope.registerError = "Username must be at least 3 characters.";
			} else if($scope.newPassword.length < 3){
				$scope.registerError =  "Password must be at least 3 characters.";
			}else {
				$http({
					method: 'GET',
					url: '/register',
					params: {username: $scope.newUsername}
				}).then(function successCallback(data){
					if(data.data.err != undefined){
						$scope.registerError = data.data.err;
					} else {
						$scope.registerUser();
					}
				}, function errorCallback(error){
					console.log(error);
				})
			}
		};

		$scope.login = function() {
			$scope.loginError = '';
			$http({
				method: "GET",
				url: '/login',
				params: {username: $scope.username, password: $scope.password}
			}).then(function successCallback(data){
				if(data.data.err != undefined){
					$scope.loginError = data.data.err;	
				} else {
					console.log(data.data);
				}
			}, function(error){
				console.log(error);
			});
		};

	});

	app.service('showFields', function(){
		this.showEntrance = true;
		this.showTeam = false;
		this.showGoals = false;
	});

	app.service('userData', function(){
		this.username = '';
		this.userID = '';
		this.teamName = '';
		this.teamID = '';
	});